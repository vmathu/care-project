import { ImageList, ImageListItem } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { cover, image1, image2, image3, image4 } from "../mocks";

const useStyles = makeStyles(() => ({
  img: {
    borderRadius: "4px",
  },
}));
export default function ImagePreviewer() {
  const classes = useStyles();
  return (
    <div>
      <ImageList cols={5} gap={16} rowHeight={110} variant="quilted">
        <ImageListItem cols={5} rows={3}>
          <img className={classes.img} src={cover} alt="cover" />
        </ImageListItem>
        <ImageListItem>
          <img className={classes.img} src={image1} alt="image1" />
        </ImageListItem>
        <ImageListItem>
          <img className={classes.img} src={image2} alt="image2" />
        </ImageListItem>
        <ImageListItem>
          <img className={classes.img} src={image3} alt="image3" />
        </ImageListItem>
        <ImageListItem>
          <img className={classes.img} src={image4} alt="image4" />
        </ImageListItem>
        <ImageListItem>
          <img className={classes.img} src={cover} alt="image5" />
        </ImageListItem>
      </ImageList>
    </div>
  );
}
