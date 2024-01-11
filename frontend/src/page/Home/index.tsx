import { useEffect, useState } from "react";
import { CustomCard, SearchAppBar, Footer } from "libs/ui";
import { Grid, Box, Typography, styled } from "@mui/material";
import { Tab } from "libs/ui/components";
import { Slider } from "./components/Slider";

import { doGet } from "libs/utils/axios";

const ShopScroll = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  overflowX: "scroll",
  boxSizing: "border-box",
  paddingBottom: "1rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    boxSizing: "border-box",
  },
}));

type Props = {
  _id: string;
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

const StyledSection = styled("section")(({ theme }) => ({
  padding: "0 80px",
  [theme.breakpoints.down("sm")]: {
    padding: "0 16px",
  },
}));
const ShopSection = ({ title, children }: ShopSectionProps) => (
  <StyledSection>
    <Box sx={{ marginBottom: 4, marginTop: 4 }}>
      <Typography variant="h4" align="center">
        {title}
      </Typography>
    </Box>
    {children}
  </StyledSection>
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
          <Grid container spacing={{ xs: 2, sm: 4 }}>
            {shops.map((shop, id) => {
              const shopData = {
                ...shop,
                id: shop._id,
              };
              return (
                <Grid item xs={12} sm={3} key={id}>
                  <CustomCard {...shopData} />
                </Grid>
              );
            })}
          </Grid>
        </ShopSection>
      </SpacedComponent>
      <SpacedComponent>
        <ShopSection title="Đã đến gần đây">
          <ShopScroll item container direction="row" spacing={{ xs: 2, sm: 4 }}>
            {shops.map((shop, id) => {
              const shopData = {
                ...shop,
                id: shop._id,
              };
              return (
                <Grid item xs={12} sm={3} key={id}>
                  <CustomCard {...shopData} />
                </Grid>
              );
            })}
          </ShopScroll>
        </ShopSection>
      </SpacedComponent>
      <Footer />
    </div>
  );
}
