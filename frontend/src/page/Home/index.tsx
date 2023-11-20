import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import NavBar from 'libs/ui/components/NavBar';
import Footer from 'libs/ui/components/Footer';
interface Cafe {
    id: number;
    name: string;
    image: string;
    description: string;
}

interface Banner {
    id: number;
    image: string;
}

const cafes: Cafe[] = [
    // Add your cafes here
];

const banners: Banner[] = [
    // Add your banners here
];

export default function HomePage() {
    return (
        <Grid container spacing={2}>
            <NavBar />
            {banners.map((banner) => (
                <Grid item xs={12} key={banner.id}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={banner.image}
                        />
                    </Card>
                </Grid>
            ))}
            {cafes.map((cafe) => (
                <Grid item xs={12} sm={6} md={3} key={cafe.id}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={cafe.image}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {cafe.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {cafe.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            <Footer />
        </Grid>
    );
}