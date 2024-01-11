import {
  Breadcrumbs,
  Grid,
  Hidden,
  Typography,
  Tab,
  styled,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { ImagePreviewer, GeneralInfo, Menu, Reviews } from "./sections";
import { CustomRating } from "./components";
import { doGet } from "libs/utils/axios";

import { SearchAppBar, Footer } from "libs/ui";
import color from "libs/ui/color";

import data from "./mocks/GeneralInfo.json";
import Description from "./sections/Description";

const bcStyle: React.CSSProperties = {
  color: color.black300,
};
const bcPrimaryStyle: React.CSSProperties = {
  fontWeight: "700",
};
const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2.5rem",
  padding: "0 80px",
  [theme.breakpoints.down("sm")]: {
    gap: "1.5rem",
    padding: "0 16px",
  },
}));

const StyledTabList = styled(TabList)(({ theme }) => ({
  marginBottom: "1rem",
  [theme.breakpoints.down("sm")]: {
    marginBottom: ".5rem",
  },
}));

const StyledTabLabel = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  textTransform: "none",
}));

type ShopProps = {
  imgs: string[] | [];
  name: string | "";
  address: {
    street: string | "";
    district: string | "";
    city: string | "";
  };
  price: string | "";
  rating: number | 0;
  phone: string | "";
  time: {
    open: string | "";
    close: string | "";
  };
};

export default function Shop() {
  const { shopId } = useParams();
  const [tab, setTab] = useState("1");
  const [shop, setShop] = useState<ShopProps>({} as ShopProps);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  useEffect(() => {
    doGet(`shop/${shopId}`, {}).then((res) => {
      const data: ShopProps = res.data;
      setShop(data);
      console.log(data);
    });
  }, []);

  return (
    <>
      <SearchAppBar />
      <Root>
        <Hidden smDown>
          <Breadcrumbs>
            <Typography style={{ ...bcStyle }}>
              {shop.address ? shop.address.district : ""}
            </Typography>
            <Typography style={{ ...bcPrimaryStyle }}>{shop.name}</Typography>
          </Breadcrumbs>
        </Hidden>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <ImagePreviewer src={shop?.imgs ?? []} />
          </Grid>
          <Hidden smDown>
            <Grid item md={1}></Grid>
          </Hidden>
          <Grid item md={5}>
            <GeneralInfo {...shop} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TabContext value={tab}>
              <StyledTabList onChange={handleChange}>
                <Tab
                  label={<StyledTabLabel>Thông tin</StyledTabLabel>}
                  value="1"
                ></Tab>
                <Tab label={<StyledTabLabel>Menu</StyledTabLabel>} value="2" />
                <Tab
                  label={<StyledTabLabel>Đánh giá</StyledTabLabel>}
                  value="3"
                />
              </StyledTabList>
              <TabPanel value="1">
                <Description data={data.description} />
              </TabPanel>
              <TabPanel value="2">
                <Menu />
              </TabPanel>
              <TabPanel value="3">
                <Reviews />
              </TabPanel>
            </TabContext>
          </Grid>
          <Hidden smDown>
            <Grid item md={1}></Grid>
          </Hidden>
          <Grid item md={5}>
            <CustomRating value={data.rate} sum={shop.rating} />
          </Grid>
        </Grid>
        <div style={{ marginTop: "60px" }}></div>
      </Root>
      <Footer />
    </>
  );
}
