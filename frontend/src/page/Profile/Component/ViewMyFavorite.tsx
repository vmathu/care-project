import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import Colors from 'libs/ui/color';
import { useMediaQuery, useTheme } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FavoriteIcon from '@mui/icons-material/Favorite';

import CustomTableDesktop from './CustomTableDesktop'
import CustomTableMobile from './CustomTableMobile'


export default function Profile() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))



    const headers = ['Tên quán', 'Địa chỉ', 'Bỏ yêu thích']

    const rows = []

    for (let i = 1; i < 200; i++) {
        rows.push({
            "fullname": "The coffee house Nguyễn Thị Thập " + i,
            "address": "686/123 Nguyễn Thị Thập, Phường XXX, Quận XXX, Thành phố Hồ Chí Minh " + i,
        })
    }


    const modifiedRows = !isMobile
        ? rows.map(row => ({
            ...row,
            icon: <HighlightOffIcon />,
        }))
        : rows.map(row => ({
            ...row,
            icon: <FavoriteIcon sx={{ color: Colors.orange500 }} />,
        }));

    return (
        <Grid container rowSpacing={4} columns={{ xs: 4, lg: 9 }}>
            <Grid item xs={4} lg={9}>
                <Box style={{ background: 'white', borderRadius: '16px', padding: '16px 16px' }}>
                    <h3 style={{ textAlign: 'left', color: 'black' }}>Quán yêu thích</h3>
                    {!isMobile
                        ? <CustomTableDesktop headers={headers} rows={modifiedRows} />
                        : <CustomTableMobile rows={modifiedRows} />
                    }
                </Box>
            </Grid>
        </Grid>
    )
}


