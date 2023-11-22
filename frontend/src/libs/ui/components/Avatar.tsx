import { Avatar, Menu, MenuItem, useTheme, useMediaQuery, Box } from '@mui/material';
import { InfoOutlined, FormatListNumbered, Favorite, Logout } from '@mui/icons-material';
import { useState } from 'react';
import React, { ReactNode } from 'react';
import { colors } from '..';

interface SampleMenuItemProps {
    icon: ReactNode;
    text: string;
    onClick: () => void;
}

const SampleMenuItem: React.FC<SampleMenuItemProps> = ({ icon, text, onClick }) => (
    <MenuItem
        onClick={onClick}
        sx={{
            display: 'flex',
            width: '220px',
            alignItems: 'center',
            borderRadius: '8px',
            color: colors.black200,
        }}
    >
        <Box sx={{ paddingRight: '16px', display: 'flex', alignItems: 'center' }}>
            {icon}
        </Box>
        {text}
    </MenuItem>
);

export default function LetterAvatars() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Avatar
                style={{
                    height: isMobile ? '40px' : '48px',
                    width: isMobile ? '40px' : '48px',
                    cursor: 'pointer'
                }}
                onClick={handleClick}
            >
                demo
            </Avatar>
            <Box
                component={Menu}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                    width: isMobile ? 'auto' : '252px',
                    height: isMobile ? 'auto' : '240px',
                    padding: '16px',
                    borderRadius: '20px 0px 20px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <SampleMenuItem icon={<InfoOutlined />} text="Thông tin cơ bản" onClick={handleClose} />
                <SampleMenuItem icon={<FormatListNumbered />} text="Đơn đặt chỗ của tôi" onClick={handleClose} />
                <SampleMenuItem icon={<Favorite />} text="Quán yêu thích" onClick={handleClose} />
                <SampleMenuItem icon={<Logout />} text="Đăng xuất" onClick={handleClose} />
            </Box>
        </div>
    );
}
