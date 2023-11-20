import React, { useState } from 'react';
import { Typography } from '@mui/material';
import colors from '../color';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface CardProps {
    title: string;
    address: string;
    priceRange: string;
    rating: number;
    imageUrl: string;
}

export default function Card({ title, address, priceRange, rating, imageUrl }: CardProps) {
    const styles = {
        card: { width: '284px', height: '294px' },
        image: { width: '284px', height: '204px', borderRadius: '8px' },
        padding12: { paddingTop: '12px' },
        flexRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
        textOverflow: {
            whiteSpace: 'nowrap' as 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        button: { margin: 0, padding: 0 },
        caption: { color: colors.black200, fontSize: '12px', fontWeight: 'bold' },
        body1: { margin: 0, marginRight: '10px', fontWeight: 'bold' },
        priceRatingRow: { display: 'flex', justifyContent: 'space-between', paddingTop: '12px' },
        ratingText: {
            marginLeft: '4px',
            fontWeight: '600',
            color: colors.black200,
            whiteSpace: 'nowrap' as 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        priceTypography: {
            color: colors.orange500,
            fontWeight: '600',
            whiteSpace: 'nowrap' as 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
    };

    const [isHeartClicked, setHeartClicked] = useState(false);

    const handleHeartClick = () => {
        setHeartClicked(!isHeartClicked);
    };

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    const Star: React.FC<{ type: 'full' | 'half' | 'empty' }> = ({ type }) => {
        if (type === 'full') {
            return <StarIcon sx={{ color: '#EFD36E' }} />;
        } else if (type === 'half') {
            return <StarHalfIcon sx={{ color: '#EFD36E' }} />;
        } else {
            return <StarBorderIcon />;
        }
    }

    const RatingStars = () => (
        [...Array(5)].map((_, i) => (
            <Star
                key={i}
                type={i < fullStars ? "full" : i === fullStars && halfStar ? "half" : "empty"}
            />
        ))
    );

    return (
        <div className="card" style={styles.card}>
            <img src={imageUrl} alt="Card image" style={styles.image} />
            <div style={styles.padding12}>
                <div className="title-row" style={styles.flexRow}>
                    <Typography variant="body1" style={{ ...styles.body1, ...styles.textOverflow }}>{title}</Typography>
                    <button style={styles.button} onClick={handleHeartClick}>
                        {isHeartClicked ? <FavoriteIcon sx={{ color: colors.orange500 }} /> : <FavoriteBorderIcon />}
                    </button>
                </div>
                <div style={styles.textOverflow}>
                    <Typography variant="caption" style={styles.caption}>{address}</Typography>
                </div>
            </div>
            <div className="price-rating-row" style={styles.priceRatingRow}>
                <Typography variant="body2" sx={styles.priceTypography}>{priceRange}</Typography>
                <div style={styles.flexRow}>
                    <RatingStars />
                    <Typography variant="body2" style={styles.ratingText}>{rating}</Typography>
                </div>
            </div>
        </div>
    );
}