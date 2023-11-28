import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Rating, Button, styled } from "@mui/material";
import {
  LocationOnRounded,
  LocalPhoneRounded,
  AccessTimeRounded,
  AttachMoneyRounded,
  LocalParkingRounded,
} from "@mui/icons-material";

import color from "libs/ui/color";

import data from "../mocks/GeneralInfo.json";

const useStyles = makeStyles((theme) => ({
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
}));

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
}));

const Title = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  [theme.breakpoints.down("sm")]: {
    alignItems: "flex-start",
  },
}));

const Info = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  [theme.breakpoints.down("sm")]: {
    gap: ".5rem",
  },
}));

const InfoList = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: ".5rem",
}));

const Rate = styled("div")(() => ({
  color: color.black300,
  display: "flex",
  gap: ".5rem",
  alignItems: "center",
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
    <Root>
      <TagList />
      <Title>
        <div>
          <Typography variant="h4">{data.name}</Typography>
          <Rate>
            <Typography variant="caption">
              {Math.floor(sum * 10) / 10}/5
            </Typography>
            <Rating size="small" readOnly defaultValue={sum} precision={0.1} />
            <Typography variant="caption">{data.bookings} lượt đặt</Typography>
          </Rate>
        </div>
        <Button variant="text">Report</Button>
      </Title>
      <InfoList>
        {infoList.map((info) => (
          <Info>
            {info.icon}
            <Typography variant="body1">{info.title}</Typography>
          </Info>
        ))}
      </InfoList>
      {/* <div>
        <Button variant="outlined">2 chỗ</Button>
        <Button variant="outlined">4 chỗ</Button>
        <Button variant="outlined">10 chỗ</Button>
      </div>
      <Button variant="contained" size="large">
        ĐẶT NGAY
      </Button> */}
    </Root>
  );
}
