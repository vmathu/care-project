import { Typography, Divider, Rating } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import color from "libs/ui/color";

type RatingBarProps = {
  value: Array<number>;
};

type DivProps = {
  value: number;
};

const useStyles = makeStyles(() => ({
  rating: {
    "& .MuiSvgIcon-root": {
      width: "60px",
      height: "60px",
    },
  },
}));

const Root = styled("div")(() => ({
  display: "flex",
  gap: "1rem",
  alignSelf: "center",
  flexDirection: "column-reverse",
  width: "100%",
}));

const RatingArea = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "40px 0px",
}));

const RatingTitle = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
}));

const RatingItem = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  color: color.black200,
  alignItems: "center",
}));

const RatingBackground = styled("div")(() => ({
  width: "100%",
  background: color.black50,
  height: "20px",
  borderRadius: "4px",
}));

const RatingBar = styled("div")(({ value }: DivProps) => ({
  width: `${value ? value : 0}%`,
  height: "100%",
  background: "#EFD36E",
  position: "relative",
  borderRadius: "4px",
}));

function nFormatter(num: number) {
  const digits = 1;
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

export default function CustomRating(value: RatingBarProps) {
  const classes = useStyles();
  const total = value?.value.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
  const sum =
    value?.value.reduce(
      (previousValue, currentValue, currentIndex) =>
        previousValue + currentValue * (currentIndex + 1)
    ) / total;
  console.log(sum);
  return (
    <RatingArea>
      <RatingTitle>
        <Rating
          className={classes.rating}
          size="large"
          defaultValue={sum}
          readOnly
          precision={0.1}
        />
        <Typography variant="h4">{Math.floor(sum * 10) / 10}</Typography>
      </RatingTitle>
      <Divider />
      <Root>
        {value?.value.map((item, index) => (
          <RatingItem>
            <Typography style={{ width: "20px" }}>{index + 1}</Typography>
            <RatingBackground>
              <RatingBar value={(item / total) * 100} />
            </RatingBackground>
            <Typography style={{ width: "40px", textAlign: "right" }}>
              {nFormatter(item)}
            </Typography>
          </RatingItem>
        ))}
      </Root>
    </RatingArea>
  );
}
