import { useEffect, useState } from "react";
import { CustomCard, SearchAppBar, Footer } from "libs/ui";
import { styled } from "@mui/system";
import { Grid, Box, Typography } from "@mui/material";
import { Tab } from "libs/ui/components";
import { Slider } from "./components/Slider";

import { doGet } from "libs/utils/axios";

const ShopGrid = styled(Grid)(({ theme }) => ({
  margin: "0 80px !important",
  width: "-webkit-fill-available !important",
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0 !important",
    marginRight: "1rem !important",
  },
}));

const ShopScroll = styled(Grid)(({ theme }) => ({
  margin: "0 80px !important",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  overflowX: "scroll",
  width: "-webkit-fill-available !important",
  boxSizing: "border-box",
  paddingBottom: "1rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    marginLeft: "0 !important",
    marginRight: "1rem !important",
    boxSizing: "border-box",
  },
}));

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

type ShopSectionProps = {
  title: string;
  children: React.ReactNode;
};

const ShopSection = ({ title, children }: ShopSectionProps) => (
  <section style={{ padding: "0 16px" }}>
    <Box sx={{ marginBottom: 4, marginTop: 4 }}>
      <Typography variant="h4" align="center">
        {title}
      </Typography>
    </Box>
    {children}
  </section>
);

interface SpacedComponentProps {
  children: JSX.Element | JSX.Element[];
}

const SpacedComponent: React.FC<SpacedComponentProps> = ({ children }) => (
  <div style={{ marginBottom: "60px" }}>{children}</div>
);

export default function HomePage() {
  const tabItems = ["Top đánh giá", "Gần bạn", "Yêu thích"];
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
    <div>
      <SearchAppBar />
      <Slider />
      <SpacedComponent>
        <ShopSection title="Gợi ý hôm nay">
          <Tab tabItems={tabItems} />
          <ShopGrid container spacing={{ xs: 2, sm: 4 }}>
            {shops.map((shop, id) => {
              return (
                <Grid item xs={12} sm={3} key={id}>
                  <CustomCard {...shop} />
                </Grid>
              );
            })}
          </ShopGrid>
        </ShopSection>
      </SpacedComponent>
      <SpacedComponent>
        <ShopSection title="Đã đến gần đây">
          <ShopScroll item container direction="row" spacing={{ xs: 2, sm: 4 }}>
            {shops.map((shop, id) => (
              <Grid item xs={12} sm={3} key={id}>
                <CustomCard {...shop} />
              </Grid>
            ))}
          </ShopScroll>
        </ShopSection>
      </SpacedComponent>
      <Footer />
    </div>
  );
}
