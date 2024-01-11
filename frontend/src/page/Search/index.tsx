import { CustomCard, colors, SearchAppBar, Footer } from "libs/ui";
import { Search, Tag } from "./components";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
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
};

export default function SearchPage() {
  if (!checkLoginToken()) window.location.href = "/SignIn";
  let q = useLoaderData();
  const [shops, setShops] = useState<Array<Props>>([]);

  useEffect(() => {
    doGet("shop", {})
      .then((response) => {
        const data: Props[] = response.data;
        return data;
      })
      .then((data) => {
        setShops(data);
      });
  }, []);

  return (
    <div style={{ ...rootStyle }}>
      <SearchAppBar value={q as string} />
      <div style={{ ...recStyle }}></div>
      <Search value={q as string} />
      <Tags>
        {labels.map((label, id) => (
          <Tag label={label} key={id} />
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
