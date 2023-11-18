import { makeStyles } from "@mui/styles";
import data from "../mocks/GeneralInfo.json";
import color from "libs/ui/color";
import { Typography, Rating, Button } from "@mui/material";

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

export default function GeneralInfo() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TagList />
      <div className={classes.title}>
        <div>
          <Typography variant="h4">{data.name}</Typography>
          <div className={classes.rate}>
            <Typography variant="caption">{data.rate}/5</Typography>
            <Rating
              size="small"
              readOnly
              defaultValue={data.rate}
              precision={0.1}
            />
            <Typography variant="caption">{data.bookings} lượt đặt</Typography>
          </div>
        </div>
        <Button variant="text">Report</Button>
      </div>
    </div>
  );
}
