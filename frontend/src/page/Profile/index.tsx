import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/system/Box';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Colors from '../../libs/ui/color';
import { Button, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { CustomSelect, CustomTextField } from "libs/ui";


import * as Yup from 'yup'
import { useFormik } from 'formik'

import { ChangePasswordValues } from './interface'
import CustomTableDesktop from './Component/CustomTableDesktop'
import CustomTableMobile from './Component/CustomTableMobile'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Profile() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const [itemMenu, setItemMenu] = useState('Thông tin cơ bản')

    const validationSchema: Yup.ObjectSchema<ChangePasswordValues> = Yup.object({
        Password: Yup.string().required('Nhập mật khẩu mới').max(255).min(8, 'Mật khẩu phải có ít nhất 8 kí tự'),
        ConfirmPassword: Yup.string().required('Nhập lại mật khẩu mới để xác nhận').oneOf([Yup.ref('Password')], 'Mật khẩu không trùng khớp').max(255),
    })

    const formData = useFormik({
        initialValues: {
            Password: "",
            ConfirmPassword: "",
        },
        validationSchema,
        validateOnChange: true,
        validateOnMount: true,
        enableReinitialize: true,
        initialErrors: { Password: 'Password is required' },
        onSubmit: () => {
        }
    })


    const handleBasicInfo = () => {
        return (
            <Grid container rowSpacing={4} columns={{ xs: 4, lg: 9 }}>
                <Grid item xs={4} lg={9}>
                    <Box style={{ background: 'white', borderRadius: '16px', padding: '16px 16px' }}>
                        <h3 style={{ textAlign: 'left', color: 'black' }}>
                            Thông tin cơ bản
                        </h3>

                        <Grid container columns={{ xs: 4, lg: 9 }} direction={isMobile ? 'column-reverse' : 'row'}>
                            <Grid item xs={4} lg={7}>
                                <CustomTextField
                                    label="Họ tên"
                                    textFieldProps={{ required: true, fullWidth: true }} />

                                <CustomTextField
                                    label="Email"
                                    textFieldProps={{ required: true, fullWidth: true }} />
                            </Grid>

                            <Grid item xs={4} lg={2}>
                                <Grid container justifyContent="center" alignItems="center">
                                    <Skeleton variant="circular" width={160} height={160} />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container columns={{ xs: 4, lg: 9 }}>
                            <Grid item xs={4} lg={9}>
                                <CustomTextField
                                    label="Số điện thoại"
                                    textFieldProps={{ required: true, fullWidth: true }} />
                            </Grid>

                            <Grid item xs={4} lg={9} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-around', gap: '1rem' }}>
                                <CustomSelect
                                    label="Thành phố"
                                    rootStyle={{width: isMobile ? '100%': '50%'}}
                                    selectProps={{
                                        required: true,
                                        defaultValue: "",
                                        displayEmpty: true,
                                        fullWidth: true
                                    }}
                                >
                                    <MenuItem value="" disabled style={{ display: "none" }}>
                                        Thành phố
                                    </MenuItem>
                                    <MenuItem value="hcm">Hồ Chí Minh</MenuItem>
                                    <MenuItem value="hn">Hà Nội</MenuItem>
                                </CustomSelect>

                                <CustomSelect
                                    label="Quận/Huyện"
                                    rootStyle={{width: isMobile ? '100%': '50%'}}
                                    selectProps={{
                                        required: true,
                                        defaultValue: "",
                                        displayEmpty: true,
                                        fullWidth: true
                                    }}
                                >
                                    <MenuItem value="" disabled style={{ display: "none" }}>
                                        Quận
                                    </MenuItem>
                                    <MenuItem value="q1">Quận 1</MenuItem>
                                    <MenuItem value="q5">Quận 5</MenuItem>
                                </CustomSelect>

                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-start">
                            <Button variant="text" size="large">
                                Hủy
                            </Button>
                            <Button variant="contained" size="large">
                                Lưu thay đổi
                            </Button>
                        </Grid>

                    </Box>
                </Grid>

                <Grid item lg={12} xs={4}>
                    <Box style={{ background: 'white', borderRadius: '16px', padding: '16px 16px' }}>
                        <h3 style={{ textAlign: 'left', color: 'black' }}>Đổi mật khẩu</h3>
                        <CustomTextField
                            label="Nhập mật khẩu cũ"
                            textFieldProps={{ required: true, fullWidth: true, type: 'password' }} />
                        <CustomTextField
                            label="Nhập mật khẩu mới"
                            textFieldProps={{ name: 'newPassword', required: true, fullWidth: true, type: 'password' }} />
                        <CustomTextField
                            label="Nhập lại mật khẩu mới"
                            textFieldProps={{ name: 'confirmPassword', required: true, fullWidth: true, type: 'password' }} />
                        <Grid container justifyContent="flex-start">
                            <Button variant="text" size="large">
                                Hủy
                            </Button>
                            <Button variant="contained" size="large">
                                Lưu thay đổi
                            </Button>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item lg={12} xs={4}>
                    <Box style={{ background: 'white', borderRadius: '16px', padding: '16px 16px' }}>
                        <h3 style={{ textAlign: 'left', color: 'black' }}>Xoá tài khoản</h3>
                        <p style={{ textAlign: 'justify', color: 'black' }}>Một khi tài khoản bị xóa, tất cả dữ liệu của bạn sẽ bị mất và không thể khôi phục tài khoản. Hãy lưu ý kỹ trước khi xác nhận xóa tài khoản.</p>
                        <Button variant="text" size="large" style={{ display: 'flex' }}>Xoá tài khoản</Button>
                    </Box>
                </Grid>
            </Grid>
        )
    }

    const handleMyOrder = () => {
        const rows = []
        const statuses = ["waiting", "rejected", "completed"];

        for (let i = 1; i < 200; i++) {
            rows.push({
                "id": i,
                "fullname": "Sample " + i,
                "orderDate": "2021-10-18T00:00:00.000Z",
                "status": statuses[Math.floor(Math.random() * statuses.length)]
            })
        }

        const modifiedRows = rows.map(row => ({
            ...row,
            orderDate: new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: "Asia/Bangkok" })
                .format(new Date(row.orderDate))
                .replace(/, /g, ' ')
        }));

        const headers = ['ID đơn hàng', 'Tên quán', 'Ngày đặt hàng', 'Trạng thái'];


        return (
            <Grid container rowSpacing={4} columns={{ xs: 4, lg: 9 }}>
                <Grid item xs={4} lg={9}>
                    <Box style={{ background: 'white', borderRadius: '16px', padding: '16px 16px' }}>
                        <h3 style={{ textAlign: 'left', color: 'black' }}>Đơn hàng của tôi</h3>
                        {!isMobile 
                        ? <CustomTableDesktop headers={headers} rows={modifiedRows}/>
                        : <CustomTableMobile rows={modifiedRows}/>
                        }
                    </Box>
                </Grid>
            </Grid>
        )
    }

    const handleFavorite = () => {
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
                icon: <FavoriteIcon sx={{color: Colors.orange500}} />,
            }));

        return (
            <Grid container rowSpacing={4} columns={{ xs: 4, lg: 9 }}>
                <Grid item xs={4} lg={9}>
                    <Box style={{ background: 'white', borderRadius: '16px', padding: '16px 16px' }}>
                        <h3 style={{ textAlign: 'left', color: 'black' }}>Quán yêu thích</h3>
                        {!isMobile 
                        ? <CustomTableDesktop headers={headers} rows={modifiedRows}/>
                        : <CustomTableMobile rows={modifiedRows}/>
                        }
                    </Box>
                </Grid>
            </Grid>
        )
    }

    const handleMenu = () => {
        return (
            <Box style={{ background: 'white', borderRadius: '16px', padding: '16px 16px' }}>
                <nav aria-label="menu-bar">
                    <h3 style={{ textAlign: 'left', color: 'black' }}>Cài đặt</h3>
                    <List>
                        <ListItem>
                            <ListItemButton onClick={() => setItemMenu('Thông tin cơ bản')}>
                                <ListItemText primary="Thông tin cơ bản" style={{ color: 'black' }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => setItemMenu('Đơn hàng của tôi')}>
                                <ListItemText primary="Đơn hàng của tôi" style={{ color: 'black' }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => setItemMenu('Quán yêu thích')}>
                                <ListItemText primary="Quán yêu thích" style={{ color: 'black' }} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemButton>
                                <ListItemText primary="Đăng xuất" style={{ color: Colors.error }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>
        )
    }

    return (
        <Grid container columns={{ lg: 12, xs: 4 }} style={{ height: '100vh', width: '100vw' }}>
            {/* Header */}
            <Grid item lg={12} xs={4} style={{ backgroundColor: Colors.orange200, height: '80px' }}>
                <b>Header</b>
            </Grid>

            {/* Content */}
            <Grid item lg={12} xs={4} style={{ padding: isMobile ? '16px 16px' : '40px 80px', backgroundColor: '#D9D9D9' }}>
                <Grid container columnSpacing={4} columns={{ lg: 12, xs: 4 }}>
                    {!isMobile && (
                        <Grid item lg={3}>
                            {handleMenu()}
                        </Grid>
                    )}

                    <Grid item xs={4} lg={9}>
                        {itemMenu === 'Thông tin cơ bản' && handleBasicInfo()}
                        {itemMenu === 'Đơn hàng của tôi' && handleMyOrder()}
                        {itemMenu === 'Quán yêu thích' && handleFavorite()}
                    </Grid>
                </Grid>
            </Grid>

            {/* Footer */}
            <Grid item lg={12} xs={4} style={{ backgroundColor: Colors.orange200, height: '80px' }}>
                <b>Footer</b>
            </Grid>
        </Grid>
    )
}
