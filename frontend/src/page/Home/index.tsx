import { CustomCard, SearchAppBar, Footer, Tab } from "libs/ui";
import { Grid, Typography, Box, useTheme, IconButton } from "@mui/material";
import { shopImg, banner } from "assets/images";
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
];

const SampleImage = 'https://via.placeholder.com/1440';

const Banner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '1440px',
        height: '807.299px',
        padding: '718px 0px 61.299px 0px',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        backgroundImage: `url(${shopImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <IconButton>
        <img src={SampleImage} alt="Sample button" />
      </IconButton>
      <IconButton>
        <img src={SampleImage} alt="Sample button" />
      </IconButton>
      <IconButton>
        <img src={SampleImage} alt="Sample button" />
      </IconButton>
      <IconButton>
        <img src={SampleImage} alt="Sample button" />
      </IconButton>
    </Box>
  );
}

export default function HomePage() {
  const tabItems = ['Top đánh giá', 'Gần bạn', 'Yêu thích'];
  const sections = ['Gợi ý hôm nay', 'Top đánh giá'];

  return (
    <div>
      <SearchAppBar />
      <Banner />
      {sections.map((section, index) => (
        <Box
          sx={{
            display: 'inline-flex',
            padding: '7px 0px',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '40px'
          }}
        >
          <Typography variant="h3">{section}</Typography>
          <Box marginTop={5}> {/* This adds a gap of 40px (4 * theme spacing unit) */}
            {index === 0 && <Tab tabItems={tabItems} />}
          </Box>
          <Box marginTop={2}> {/* This adds a gap of 16px (1.6 * theme spacing unit) */}
            <Grid container spacing={3} style={{ padding: '40px 80px' }}>
              {shops.map((shop) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={shop.fullname}>
                  <CustomCard
                    img={shop.img}
                    fullname={shop.fullname}
                    address={shop.address}
                    price={shop.price}
                    rating={shop.rating} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      ))}
      <Footer />
    </div>
  );
}