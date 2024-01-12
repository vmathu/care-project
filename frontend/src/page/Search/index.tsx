import { CustomCard, colors, SearchAppBar, Footer } from "libs/ui";
import { Search, Tag } from "./components";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { ChipPropsVariantOverrides } from "@mui/material/Chip";
import { useLoaderData } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { doGet } from "libs/utils/axios";
import { checkLoginToken } from "libs/utils/sessionHelper";

const rootStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const recStyle: React.CSSProperties = {
  height: "5rem",
  background: colors.orange50,
  width: "100%",
};

const Tags = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "1.25rem",
  marginTop: "1.5rem",
  alignSelf: "center",
  [theme.breakpoints.down("sm")]: {
    width: "-webkit-fill-available",
    alignSelf: "flex-start",
    marginLeft: "1rem",
    marginRight: "1rem",
    gap: "0.5rem",
    marginTop: "1rem",
    overflow: "scroll",
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

const ShopGrid = styled(Grid)(({ theme }) => ({
  margin: "8px 80px 8px 48px !important",
  width: "-webkit-fill-available !important",
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0 !important",
    marginRight: "1rem !important",
  },
}));

const labels = ["Check in", "Học bài", "Cho quay/ chụp", "Mang đồ ăn ngoài"];

type Props = {
  imgs: string[];
  name: string;
  address: {
    street: string;
    district: string;
    city: string;
  };
  price: string;
  rating: number;
  tag: React.ReactNode[];
};

export default function SearchPage() {
  if (!checkLoginToken()) window.location.href = "/SignIn";
  let q = useLoaderData();
  const [shops, setShops] = useState<Array<Props>>([]);
  const [fullShops, setFullShops] = useState<Array<Props>>([]);
  const [selectedLabels, setLabels] = useState<Array<React.ReactNode>>([]);

  useEffect(() => {
    doGet("shop", {})
      .then((response) => {
        const data: Props[] = response.data;
        return data;
      })
      .then((data) => {
        setShops(data);
        setFullShops(data);
      });
  }, []);

  const handleClickTag = (
    label: React.ReactNode,
    setChipVariant: React.Dispatch<
      React.SetStateAction<
        OverridableStringUnion<"filled" | "outlined", ChipPropsVariantOverrides>
      >
    >,
    chipVariant: any,
  ) => {
    setChipVariant(chipVariant == "text" ? "filled" : "text");

    let tmp: React.ReactNode[] = [];
    chipVariant == "text"
      ? (tmp = selectedLabels.concat(label))
      : (tmp = selectedLabels.filter((ele) => ele != label));
    setLabels(tmp);

    const filterShops = tmp.length
      ? fullShops.filter((shop) => tmp.every((ele) => shop.tag.includes(ele)))
      : fullShops;
    setShops(filterShops);
  };

  return (
    <div style={{ ...rootStyle }}>
      <SearchAppBar value={q as string} />
      <div style={{ ...recStyle }}></div>
      <Search value={q as string} />
      <Tags>
        {labels.map((label, id) => (
          <Tag label={label} key={id} onClick={handleClickTag} />
        ))}
      </Tags>
      <ShopGrid container spacing={{ xs: 2, sm: 4 }}>
        {shops.map((shop, id) => (
          <Grid item xs={12} sm={3} key={id}>
            <CustomCard {...shop} />
          </Grid>
        ))}
      </ShopGrid>
      <div style={{ marginTop: "60px" }}>
        <Footer />
      </div>
    </div>
  );
}
