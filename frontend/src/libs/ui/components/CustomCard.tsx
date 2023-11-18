import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { colors } from "..";
import { Rating } from "@mui/material";

const cardFooter: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

type Props = {
  img: string[];
  fullname: string;
  address: {
    street: string;
    district: string;
    city: string;
  };
  price: string;
  rating: number;
};

export const CustomCard = ({
  img,
  fullname,
  address,
  price,
  rating,
}: Props) => {
  return (
    <Card>
      <CardMedia component="img" alt={fullname} height="204" image={img[0]} />
      <CardContent>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {fullname}
        </Typography>
        <Typography noWrap variant="caption" color="text.secondary">
          {address.street}, {address.district}, {address.city}
        </Typography>
      </CardContent>
      <div style={{ ...cardFooter }}>
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
