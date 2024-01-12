import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  Rating,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
  toggleButtonClasses,
  Drawer,
  IconButton,
  Box,
  styled,
  Divider,
  useMediaQuery,
} from "@mui/material";
import {
  LocationOnRounded,
  LocalPhoneRounded,
  AccessTimeRounded,
  AttachMoneyRounded,
  LocalParkingRounded,
  CloseRounded,
} from "@mui/icons-material";

import color from "libs/ui/color";
import { CustomTextField } from "libs/ui/components";

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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    borderRadius: theme.shape.borderRadius,
    textTransform: "none",
  },
  [`& .${toggleButtonClasses.root}`]: {
    border: `1px solid ${color.black50}`,
  },
  [`& .${toggleButtonClasses.root}:hover`]: {
    border: `1px solid ${color.black100}`,
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

const CardCheckout = styled("div")(({ theme }) => ({
  display: "flex",
  padding: "1rem",
  gap: "1.25rem",
}));

const DrawerContent = styled("div")(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
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

type Props = {
  imgs: string[] | [];
  address: {
    street: string;
    district: string;
    city: string;
  };
  phone: string;
  time: {
    open: string;
    close: string;
  };
  price: string;
  rating: number;
  parking?: boolean | true;
  rate?: number[] | [];
  bookings?: number | 213;
  tags?: string[] | [];
  name: string;
};

export default function GeneralInfo(shop: Props) {
  const [seat, setSeat] = React.useState<string | null>("2");
  const [drawer, setDrawer] = React.useState(false);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  const handleSeat = (
    _event: React.MouseEvent<HTMLElement>,
    newSeat: string | null,
  ) => {
    setSeat(newSeat);
  };

  const infoList: InfoProps[] = [
    {
      icon: <LocationOnRounded />,
      title: `${shop.address?.street}, ${shop.address?.district}, ${shop.address?.city}`,
    },
    {
      icon: <LocalPhoneRounded />,
      title: `${shop.phone || "0134 567 890"}`,
    },
    {
      icon: <AccessTimeRounded />,
      title: `${shop.time?.open} - ${shop.time?.close}`,
    },
    {
      icon: <AttachMoneyRounded />,
      title: `${shop.price}`,
    },
    {
      icon: <LocalParkingRounded />,
      title: `${
        shop.parking === true ? "Miễn phí gửi xe" : "Phí gửi xe riêng"
      }`,
    },
  ];

  const total = data.rate.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
  );
  const sum =
    data.rate.reduce(
      (previousValue, currentValue, currentIndex) =>
        previousValue + currentValue * (currentIndex + 1),
    ) / total;

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawer(open);
    };

  return (
    <Root>
      <TagList />
      <Title>
        <div>
          <Typography variant="h4">{shop.name}</Typography>
          <Rate>
            <Typography variant="caption">{shop.rating}/5</Typography>
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography style={{ width: "6rem" }}>Giờ</Typography>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <CustomTextField
            textFieldProps={{ placeholder: "Bắt đầu", size: "small" }}
            containerStyle={{ width: "6rem", gap: 0 }}
          ></CustomTextField>
          <Typography>-</Typography>
          <CustomTextField
            textFieldProps={{ placeholder: "Kết thúc", size: "small" }}
            containerStyle={{ width: "6rem", gap: 0 }}
          ></CustomTextField>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography style={{ width: "6rem" }}>Loại bàn</Typography>
        <StyledToggleButtonGroup
          exclusive
          color="primary"
          value={seat}
          onChange={handleSeat}
        >
          <ToggleButton component="button" value="2">
            <Typography>2 chỗ</Typography>
          </ToggleButton>
          <ToggleButton component="button" value="4">
            <Typography>4 chỗ</Typography>
          </ToggleButton>
          <ToggleButton component="button" value="10">
            <Typography>10 chỗ</Typography>
          </ToggleButton>
        </StyledToggleButtonGroup>
      </div>
      <Button variant="contained" size="large" onClick={toggleDrawer(true)}>
        ĐẶT NGAY
      </Button>
      <Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: isMobile ? "100vw" : 300,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem 1rem",
              }}
            >
              <Typography>Đơn đặt chỗ của bạn</Typography>
              <IconButton size="small" onClick={toggleDrawer(false)}>
                <CloseRounded />
              </IconButton>
            </div>
            <Divider />
          </div>
          <DrawerContent>
            <CardCheckout
              style={{ padding: "1rem", display: "flex", gap: "1.25rem" }}
            >
              <img
                style={{
                  width: "4rem",
                  height: "4rem",
                  objectFit: "cover",
                  borderRadius: "2px",
                }}
                src={shop.imgs ? shop.imgs[0] : ""}
              />
              <div>
                <Typography>{shop.name}</Typography>
                <Typography>Bàn 10 chỗ: 8h - 12h </Typography>
              </div>
            </CardCheckout>
            <Button
              variant="contained"
              size="large"
              onClick={toggleDrawer(false)}
              style={{ margin: "1rem" }}
            >
              XÁC NHẬN
            </Button>
          </DrawerContent>
        </Box>
      </Drawer>
    </Root>
  );
}
