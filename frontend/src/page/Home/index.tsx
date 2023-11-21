// import { Grid, CardContent, CardMedia, Typography } from '@mui/material';
// import NavBar from 'libs/ui/components/NavBar';
// import Footer from 'libs/ui/components/Footer';
// import Card from 'libs/ui/components/Card';

// interface Cafe {
//     id: number;
//     name: string;
//     image: string;
//     description: string;
// }

// interface Banner {
//     id: number;
//     image: string;
// }

// const cafes: Cafe[] = [
//     // Add your cafes here
// ];

// const banners: Banner[] = [
//     // Add your banners here
// ];

// export default function HomePage() {
//     return (
//         <Grid container spacing={2}>
//             <NavBar />
//             <Card
//                 title="Lorem ipsum dolor sit amet"
//                 address="227 Nguyễn Văn Cừ, phường 4, quận 5, thành phố Hồ Chí Minh, Việt Nam"
//                 priceRange="35k - 52k"
//                 rating={2.5}
//             />
//             <Footer />
//         </Grid>
//     );
// }

import React from 'react';
import Card from 'libs/ui/components/Card';

const App: React.FC = () => {
  return (
    <div>
      <Card
        title="Lorem ipsum dolor sit amet"
        address="227 Nguyễn Văn Cừ, phường 4, quận 5, thành phố Hồ Chí Minh, Việt Nam"
        priceRange="35k - 52k"
        rating={2.5}
        imageUrl='https://i.imgur.com/ZwcwmJv.png'
      />
    </div>
  );
};

export default App;
