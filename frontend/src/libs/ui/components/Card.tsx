import React, { useState } from 'react';
import { Typography } from '@mui/material';
import colors from '../color';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface CardProps {
    title: string;
    address: string;
    priceRange: string;
    rating: number;
    imageUrl: string;
}

export default function Card({ title, address, priceRange, rating, imageUrl }: CardProps) {
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

    return (
        <div className="card" style={{ width: '284px', height: '294px' }}>
            <img src={imageUrl} alt="Card image" style={{ width: '284px', height: '204px', borderRadius: '8px' }} />
            <div className="title-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body1" style={{ margin: 0, marginRight: '10px' }}>{title}</Typography>
                <button style={{ margin: 0, padding: 0 }} onClick={handleHeartClick}>
                    {isHeartClicked ? '❤️' : '🤍'}
                </button>
            </div>
            <Typography variant="caption">{address}</Typography>
            <div className="price-rating-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: colors.orange500 }}>{priceRange}</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {[...Array(5)].map((_, i) => {
                        if (i < fullStars) {
                            return <Star key={i} type="full" />;
                        } else if (i === fullStars && halfStar) {
                            return <Star key={i} type="half" />;
                        } else {
                            return <Star key={i} type="empty" />;
                        }
                    })}
                    <Typography variant="body2" style={{ marginLeft: '8px' }}>{rating}</Typography>
                </div>
            </div>
        </div>
    );
}