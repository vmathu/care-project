import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Rating, Button } from "@mui/material";
import {
  LocationOnRounded,
  LocalPhoneRounded,
  AccessTimeRounded,
  AttachMoneyRounded,
  LocalParkingRounded,
} from "@mui/icons-material";

import color from "libs/ui/color";

import data from "../mocks/GeneralInfo.json";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  tag: {
    color: color.black200,
    backgroundColor: color.black25,
    borderRadius: "1.5rem",
    padding: "6px 12px",
    display: "flex",
    justifyContent: "center",
    fontWeight: "600 !important",
  },
  tagList: {
    display: "flex",
    gap: "1rem",
  },
  rate: {
    color: color.black300,
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  infoList: {
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
  },
  info: {
    display: "flex",
    gap: "1rem",
  },
}));

const TagList = () => {
  const classes = useStyles();
  const tags = data.tags;
  return (
    <div className={classes.tagList}>
      {tags.map((tag) => (
        <Typography className={classes.tag} variant="caption">
          {tag}
        </Typography>
      ))}
    </div>
  );
};

type InfoProps = {
  icon: React.ReactNode;
  title: string;
};

const infoList: InfoProps[] = [
  {
    icon: <LocationOnRounded />,
    title: `${data.address.street}, ${data.address.district}, ${data.address.city}`,
  },
  {
    icon: <LocalPhoneRounded />,
    title: `${data.phone}`,
  },
  {
    icon: <AccessTimeRounded />,
    title: `${data.time.open} - ${data.time.close}`,
  },
  {
    icon: <AttachMoneyRounded />,
    title: `~${data.price}`,
  },
  {
    icon: <LocalParkingRounded />,
    title: `${data.parking === true ? "Miễn phí gửi xe" : "Phí gửi xe riêng"}`,
  },
];

export default function GeneralInfo() {
  const classes = useStyles();

  const total = data.rate.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
  const sum =
    data.rate.reduce(
      (previousValue, currentValue, currentIndex) =>
        previousValue + currentValue * (currentIndex + 1)
    ) / total;
  return (
    <div className={classes.root}>
      <TagList />
      <div className={classes.title}>
        <div>
          <Typography variant="h4">{data.name}</Typography>
          <div className={classes.rate}>
            <Typography variant="caption">
              {Math.floor(sum * 10) / 10}/5
            </Typography>
            <Rating size="small" readOnly defaultValue={sum} precision={0.1} />
            <Typography variant="caption">{data.bookings} lượt đặt</Typography>
          </div>
        </div>
        <Button variant="text">Report</Button>
      </div>
      <div className={classes.infoList}>
        {infoList.map((info) => (
          <div className={classes.info}>
            {info.icon}
            <Typography variant="body1">{info.title}</Typography>
          </div>
        ))}
      </div>
      {/* <div>
        <Button variant="outlined">2 chỗ</Button>
        <Button variant="outlined">4 chỗ</Button>
        <Button variant="outlined">10 chỗ</Button>
      </div>
      <Button variant="contained" size="large">
        ĐẶT NGAY
      </Button> */}
    </div>
  );
}
