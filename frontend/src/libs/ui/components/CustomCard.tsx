import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Rating,
} from "@mui/material";
import { colors } from "..";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { Link } from "react-router-dom";

const spaceBetween: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

type Props = {
  id: string;
  imgs: string[];
  name: string;
  address: {
    street: string;
    district: string;
    city: string;
  };
  price: string;
  rating: number;
  _id?: string;
};

export const CustomCard = ({
  imgs,
  name,
  address,
  price,
  rating,
  _id,
}: Props) => {
  const [favState, setFavState] = useState(false);
  const handleFavClick = () => {
    setFavState(!favState);
  };
  return (
    <Card>
      <Link to={`/Shop/${_id}`}>
        <CardMedia
          component="img"
          alt={name}
          image={imgs[0]}
          sx={{ aspectRatio: "16 / 9" }}
        />
      </Link>
      <CardContent>
        <div style={{ ...spaceBetween }}>
          <Link to={`/Shop/${_id}`} style={{ color: "inherit" }}>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {name}
            </Typography>
          </Link>
          <IconButton onClick={handleFavClick}>
            {favState ? (
              <FavoriteIcon sx={{ color: colors.orange500 }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>
        <Typography noWrap variant="caption" color="text.secondary">
          {address.street}, {address.district}, {address.city}
        </Typography>
      </CardContent>
      <div style={{ ...spaceBetween }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: "600", color: colors.orange500 }}
        >
          {price}
        </Typography>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Rating value={rating} precision={0.5} size="small" readOnly />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: "600" }}
          >
            {rating}
          </Typography>
        </div>
      </div>
    </Card>
  );
};
