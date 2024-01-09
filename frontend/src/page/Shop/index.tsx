import { Breadcrumbs, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import ImagePreviewer from "./sections/ImagePreviewer";
import GeneralInfo from "./sections/GeneralInfo";
import color from "libs/ui/color";

import data from "./mocks/GeneralInfo.json";
import CustomRating from "./components/CustomRating";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "Be Vietnam Pro",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
  bc: {
    color: color.black300,
  },
  bcPrimary: {
    fontWeight: "bold !important",
  },
}));

export default function Shop() {
  const { shopId } = useParams();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs>
        <Typography className={classes.bc}>Quận 5</Typography>
        <Typography className={classes.bc}>Học bài</Typography>
        <Typography className={classes.bcPrimary}>Vòm Coffee</Typography>
      </Breadcrumbs>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <ImagePreviewer />
        </Grid>
        <Grid item md={1} xs={0}></Grid>
        <Grid item md={5}>
          <GeneralInfo />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Typography variant="h5">Thông tin</Typography>
          <Typography variant="body1">{data.description}</Typography>
        </Grid>
        <Grid item md={1} xs={0}></Grid>
        <Grid item md={5}>
          <CustomRating value={data.rate} />
        </Grid>
      </Grid>
    </div>
  );
}
