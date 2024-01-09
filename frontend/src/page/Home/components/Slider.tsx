import { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import banner4 from '../assets/banner4.png';
import colors from 'libs/ui/color';

const images = [
    banner1,
    banner2,
    banner3,
    banner4,
];

const styles = {
    container: (isMobile: boolean) => ({
        overflow: 'hidden',
        height: isMobile ? '20%' : '100%'
    }),
    slider: (currentImage: number) => ({
        width: '100%',
        height: '100%',
        whiteSpace: 'nowrap' as 'nowrap',
        transform: `translate3d(${-currentImage * 100}%, 0, 0)`,
        transition: 'ease 1000ms',
    }),
    image: () => ({
        display: 'inline-block',
        width: '100%',
        height: 'auto',
        borderRadius: '40px',
        objectFit: 'contain' as 'contain',
    }),
    dotsContainer: (): React.CSSProperties => ({
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        padding: '10px',
        alignItems: 'flex-start',
        gap: '10px'
    }),
    dot: (currentImage: number, index: number, dotSize: string): React.CSSProperties => ({
        display: 'inline-block',
        width: dotSize,
        height: dotSize,
        borderRadius: '50%',
        backgroundColor: currentImage === index ? colors.orange500 : '#D9D9D9',
        margin: '5px',
        cursor: 'pointer',
    }),
};

export const Slider = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dotSize = isMobile ? '5px' : '10px';

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevCurrentImage) => (prevCurrentImage + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.container(isMobile)}>
            <div style={styles.slider(currentImage)}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        style={styles.image()}
                    />
                ))}
            </div>
            <div style={styles.dotsContainer()}>
                {!isMobile && images.map((_, index) => (
                    <div
                        key={index}
                        style={styles.dot(currentImage, index, dotSize)}
                        onClick={() => setCurrentImage(index)}
                    />
                ))}
            </div>
        </div>
    );
};