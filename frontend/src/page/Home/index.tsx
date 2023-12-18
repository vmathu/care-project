import { CustomCard, SearchAppBar, Footer } from "libs/ui";
import { styled } from "@mui/system";
import { Grid, Box, Typography } from "@mui/material";
import { shopImg } from "assets/images";
import { Tab } from "libs/ui/components";
import { Slider } from './components/Slider';

const ShopGrid = styled(Grid)(({ theme }) => ({
  margin: "0 80px !important",
  width: "-webkit-fill-available !important",
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0 !important",
    marginRight: "1rem !important",
  },
}));

const ShopScroll = styled(Grid)(({ theme }) => ({
  margin: "0 80px !important",
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  overflowX: 'auto',
  width: "-webkit-fill-available !important",
  boxSizing: 'border-box',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: 'column',
    overflowX: 'auto',
    marginLeft: "0 !important",
    marginRight: "1rem !important",
    boxSizing: 'border-box',
  },
}));

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

const shop: Props = {
  img: [shopImg, shopImg],
  fullname: "Lorem ipsum dolor sit amet",
  address: {
    street: "227 Nguyễn Văn Cừ phường 4",
    district: "quận 5",
    city: "thành phố Hồ Chí Minh",
  },
  price: "35k - 52k",
  rating: 2.5,
};

const shops: Props[] = Array(8).fill(shop);

type ShopSectionProps = {
  title: string;
  children: React.ReactNode;
};

const ShopSection = ({ title, children }: ShopSectionProps) => (
  <section style={{ padding: '0 16px' }}>
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h4" align="center">{title}</Typography>
    </Box>
    {children}
  </section>
);

interface SpacedComponentProps {
  children: JSX.Element | JSX.Element[]
}

const SpacedComponent: React.FC<SpacedComponentProps> = ({ children }) => (
  <div style={{ marginBottom: '60px' }}>
    {children}
  </div>
);

export default function HomePage() {
  const tabItems = ['Top đánh giá', 'Gần bạn', 'Yêu thích'];
  return (
    <div>
      <SearchAppBar />
      <SpacedComponent>
        <Slider />
      </SpacedComponent>
      <SpacedComponent>
        <ShopSection title="Gợi ý hôm nay">
          <Tab tabItems={tabItems} />
          <ShopGrid container spacing={{ xs: 2, sm: 4 }}>
            {shops.slice(0, 8).map((shop, id) => (
              <Grid item xs={12} sm={3} key={id}>
                <CustomCard {...shop} />
              </Grid>
            ))}
          </ShopGrid>
        </ShopSection>
      </SpacedComponent>
      <SpacedComponent>
        <ShopSection title="Đã đến gần đây">
          <ShopScroll item container direction="row" spacing={{ xs: 2, sm: 4 }}>
            {shops.slice(0, 8).map((shop, id) => (
              <Grid item xs={12} sm={3} key={id}>
                <CustomCard {...shop} />
              </Grid>
            ))}
          </ShopScroll>
        </ShopSection>
      </SpacedComponent>
      <Footer />
    </div>
  );
}