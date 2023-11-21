import React from 'react';
import LogoWhite from '../../../assets/app-logo-white.svg';
import colors from 'libs/ui/color';
import theme from 'libs/ui/theme';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';

export default function Footer() {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const footerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile ? 'center' : 'flex-start',
        padding: isMobile ? '16px' : '20px',
        paddingLeft: isMobile ? '16px' : '80px',
        backgroundColor: colors.orange800,
        width: '100%',
        height: isMobile ? '110px' : '80px',
        flexDirection: isMobile ? 'column' : 'row'
    };

    const textStyle = {
        marginLeft: isMobile ? '0' : '20px',
        marginTop: isMobile ? '10px' : '0',
        color: 'white'
    };

    return (
        <footer style={footerStyle}>
            <img src={LogoWhite} alt="Logo" style={{ height: '40px' }} />
            <Typography variant="subtitle1" style={textStyle}>Copyright 2023 Cafe Review, trading as CaRe</Typography>
        </footer>
    );
}