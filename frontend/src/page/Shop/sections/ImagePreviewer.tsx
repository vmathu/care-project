import { ImageList, ImageListItem, Hidden, styled } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { cover, image1, image2, image3, image4 } from "../mocks";

const StyledImageList = styled(ImageList)(({ theme }) => ({
  margin: "0px",
}));

const useStyles = makeStyles(() => ({
  img: {
    borderRadius: "4px",
  },
}));

type Props = {
  src: string[];
};

export default function ImagePreviewer({ src }: Props) {
  const classes = useStyles();
  return (
    <div>
      <Hidden smDown>
        <StyledImageList cols={5} gap={16} rowHeight={110} variant="quilted">
          <ImageListItem cols={5} rows={3}>
            <img className={classes.img} src={src[0]} alt="cover" />
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
        </StyledImageList>
      </Hidden>
    </div>
  );
}
