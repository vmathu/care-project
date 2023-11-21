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
import { useState } from "react";

import { ImagePreviewer, GeneralInfo, Menu, Reviews } from "./sections";
import { CustomRating } from "./components";

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
  [theme.breakpoints.down("sm")]: {
    gap: "1.5rem",
  },
}));

export default function Shop() {
  const { shopId } = useParams();
  const [tab, setTab] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Root>
      <Hidden smDown>
        <Breadcrumbs>
          <Typography style={{ ...bcStyle }}>Quận 5</Typography>
          <Typography style={{ ...bcStyle }}>Học bài</Typography>
          <Typography style={{ ...bcPrimaryStyle }}>Vòm Coffee</Typography>
        </Breadcrumbs>
      </Hidden>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <ImagePreviewer />
        </Grid>
        <Hidden smDown>
          <Grid item md={1}></Grid>
        </Hidden>
        <Grid item md={5}>
          <GeneralInfo />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <TabContext value={tab}>
            <TabList onChange={handleChange}>
              <Tab label="Thông tin" value="1" />
              <Tab label="Menu" value="2" />
              <Tab label="Đánh giá" value="3" />
            </TabList>
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
          <CustomRating value={data.rate} />
        </Grid>
      </Grid>
    </Root>
  );
}
