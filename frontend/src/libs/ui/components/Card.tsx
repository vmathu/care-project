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

    return (
        <div className="card" style={styles.card}>
            <img src={imageUrl} alt="Card image" style={styles.image} />
            <div style={styles.padding12}>
                <div className="title-row" style={styles.flexRow}>
                    <Typography variant="body1" style={{ ...styles.body1, ...styles.textOverflow }}>{title}</Typography>
                    <button style={styles.button} onClick={handleHeartClick}>
                        {isHeartClicked ? '❤️' : '🤍'}
                    </button>
                </div>
                <div style={styles.textOverflow}>
                    <Typography variant="caption" style={styles.caption}>{address}</Typography>
                </div>
            </div>
            <div className="price-rating-row" style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px' }}>
                <Typography variant="body2" sx={{
                    color: colors.orange500,
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>{priceRange}</Typography>
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
                    <Typography variant="body2" style={{
                        marginLeft: '8px',
                        fontWeight: '600',
                        color: colors.black200,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>{rating}</Typography>
                </div>
            </div>
        </div>
    );
}