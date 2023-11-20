import React, { useState, FormEvent } from 'react';
import { AppBar, Toolbar, TextField, Box, useTheme, useMediaQuery, styled, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoText from '../../../assets/app-logo-text.svg';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import colors from '../color';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '80px',
    marginRight: theme.spacing(2),
    width: '352px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));


export default function SearchAppBar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (searchTerm !== '') {
            navigate(`/search/${searchTerm}`);
        }
    };

    return (
        <AppBar position="static" style={{ backgroundColor: colors.white }} elevation={0}>
            <Toolbar style={{ height: '88px', padding: isMobile ? '16px' : '20px 80px' }}>
                {/* <img src={LogoText} alt="logo" style={{ width: '', height: isMobile ? '20px' : '40px' }} /> */}
                <img
                    src={LogoText}
                    alt="logo"
                    style={{
                        width: isMobile ? '100px' : '',
                        height: isMobile ? '20px' : '40px',
                        padding: isMobile ? '0 16px' : ''
                    }}
                />
                <Box flexGrow={1} />
                {!isMobile && (
                    <Search>
                        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%' }}>
                            <TextField
                                type="text"
                                placeholder="cafe quận 5..."
                                aria-label="search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                style={{
                                    flex: 1,
                                    backgroundColor: isMobile ? 'transparent' : '#F2F2F2',
                                    width: isMobile ? '70%' : '100%', // make the search box smaller when on mobile
                                    border: 'none'
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" style={{ paddingLeft: '4px' }}>
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                inputProps={{
                                    style: {
                                        padding: '8px',
                                    }
                                }}
                            />
                            <Link to={`/search/${searchTerm}`}>
                                <button type="submit" style={{ display: 'none' }}>
                                    <SearchIcon />
                                </button>
                            </Link>
                        </form>
                    </Search>
                )}
                {isMobile && (
                    <Link to={`/search/${searchTerm}`}>
                        <button type="submit" style={{ padding: '16px' }}>
                            <SearchIcon />
                        </button>
                    </Link>
                )}
                <Box mr={2} />
                <Avatar />
            </Toolbar>
        </AppBar>
    );
}