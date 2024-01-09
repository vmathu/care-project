import { CustomCard, colors, SearchAppBar, Footer } from "libs/ui";
import { Search, Tag } from "./components";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { shopImg } from "assets/images";

const rootStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const recStyle: React.CSSProperties = {
  height: "5rem",
  background: colors.orange50,
  width: "100%",
};

const Tags = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "1.25rem",
  marginTop: "1.5rem",
  alignSelf: "center",
  [theme.breakpoints.down("sm")]: {
    width: "-webkit-fill-available",
    alignSelf: "flex-start",
    marginLeft: "1rem",
    marginRight: "1rem",
    gap: "0.5rem",
    marginTop: "1rem",
    overflow: "scroll",
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

const ShopGrid = styled(Grid)(({ theme }) => ({
  margin: "8px 80px 8px 48px !important",
  width: "-webkit-fill-available !important",
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0 !important",
    marginRight: "1rem !important",
  },
}));

const labels = [
  "Check in",
  "Học bài",
  "Cho quay/ chụp",
  "Label",
  "Label",
  "Label",
];

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
const shops: Props[] = [
  {
    img: [shopImg, shopImg],
    fullname: "Lorem ipsum dolor sit amet",
    address: {
      street: "227 Nguyễn Văn Cừ phường 4",
      district: "quận 5",
      city: "thành phố Hồ Chí Minh",
    },
    price: "35k - 52k",
    rating: 2.5,
  },
  {
    img: [shopImg, shopImg],
    fullname: "Lorem ipsum dolor sit amet",
    address: {
      street: "227 Nguyễn Văn Cừ phường 4",
      district: "quận 5",
      city: "thành phố Hồ Chí Minh",
    },
    price: "35k - 52k",
    rating: 2.5,
  },
  {
    img: [shopImg, shopImg],
    fullname: "Lorem ipsum dolor sit amet",
    address: {
      street: "227 Nguyễn Văn Cừ phường 4",
      district: "quận 5",
      city: "thành phố Hồ Chí Minh",
    },
    price: "35k - 52k",
    rating: 2.5,
  },
  {
    img: [shopImg, shopImg],
    fullname: "Lorem ipsum dolor sit amet",
    address: {
      street: "227 Nguyễn Văn Cừ phường 4",
      district: "quận 5",
      city: "thành phố Hồ Chí Minh",
    },
    price: "35k - 52k",
    rating: 2.5,
  },
  {
    img: [shopImg, shopImg],
    fullname: "Lorem ipsum dolor sit amet",
    address: {
      street: "227 Nguyễn Văn Cừ phường 4",
      district: "quận 5",
      city: "thành phố Hồ Chí Minh",
    },
    price: "35k - 52k",
    rating: 2.5,
  },
  {
    img: [shopImg, shopImg],
    fullname: "Lorem ipsum dolor sit amet",
    address: {
      street: "227 Nguyễn Văn Cừ phường 4",
      district: "quận 5",
      city: "thành phố Hồ Chí Minh",
    },
    price: "35k - 52k",
    rating: 2.5,
  },
  {
    img: [shopImg, shopImg],
    fullname: "Lorem ipsum dolor sit amet",
    address: {
      street: "227 Nguyễn Văn Cừ phường 4",
      district: "quận 5",
      city: "thành phố Hồ Chí Minh",
    },
    price: "35k - 52k",
    rating: 2.5,
  },
  {
    img: [shopImg, shopImg],
    fullname: "Lorem ipsum dolor sit amet",
    address: {
      street: "227 Nguyễn Văn Cừ phường 4",
      district: "quận 5",
      city: "thành phố Hồ Chí Minh",
    },
    price: "35k - 52k",
    rating: 2.5,
  },
];

export default function SearchPage() {
  return (
    <div style={{ ...rootStyle }}>
      <SearchAppBar />
      <div style={{ ...recStyle }}></div>
      <Search />
      <Tags>
        {labels.map((label, id) => (
          <Tag label={label} key={id} />
        ))}
      </Tags>
      <ShopGrid container spacing={{ xs: 2, sm: 4 }}>
        {shops.map((shop, id) => (
          <Grid item xs={12} sm={3} key={id}>
            <CustomCard
              img={shop.img}
              fullname={shop.fullname}
              address={shop.address}
              price={shop.price}
              rating={shop.rating}
            />
          </Grid>
        ))}
      </ShopGrid>
      <div style={{ marginTop: "60px" }}>
        <Footer />
      </div>
    </div>
  );
}
