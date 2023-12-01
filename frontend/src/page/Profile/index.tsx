import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/system/Box';
import { useEffect, useState, useRef } from 'react';
import Divider from '@mui/material/Divider';
import Colors from '../../libs/ui/color';
import { Button, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { CustomSelect, CustomTextField } from "libs/ui";
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'libs/redux/store';
import { setToast } from 'libs/redux/slice/toastSlice';

import { doPost } from 'libs/utils/axios';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { ChangePasswordValues, BasicInfoValues } from './interface'
import { checkLoginToken } from 'libs/utils/sessionHelper';
import { deleteLoginData } from 'libs/utils/sessionHelper';

import CustomTableDesktop from './Component/CustomTableDesktop'
import CustomTableMobile from './Component/CustomTableMobile'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SearchAppBar } from 'libs/ui';
import { Footer } from 'libs/ui';
import Toast from 'libs/ui/components/CustomToast';
import Dialog from '@mui/material/Dialog';

export default function Profile() {
    if (!checkLoginToken()) window.location.href = '/HomePage'

    const theme = useTheme()
    const dispatch = useDispatch<AppDispatch>()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [itemMenu, setItemMenu] = useState('Thông tin cơ bản')

    const [basicInfo, setBasicInfo] = useState<BasicInfoValues | null>(null);
    const defaultBasicInfo = useRef<BasicInfoValues | null>(null);

    const [openPopup, setOpenPopup] = useState(false);
    const [disabledField, setDisabledField] = useState(true);

    const handleFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBasicInfo(prevState => prevState ? { ...prevState, fullname: event.target.value } : { fullname: event.target.value, email: '', phone: '' });
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBasicInfo(prevState => prevState ? { ...prevState, phone: event.target.value } : { fullname: '', email: '', phone: event.target.value });
    };

    const loginInfo = localStorage.getItem('login_info');
    let id = loginInfo ? JSON.parse(loginInfo).user.id : "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await doPost('user/get-basic-info', { "id": id });
                setBasicInfo(response.data);
                defaultBasicInfo.current = response.data;
            } catch (error) {
                // console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleChangeBasicInfoSubmit = async () => {
        try {
            const response = await doPost('user/change-basic-info', {
                "id": id,
                "fullname": basicInfo?.fullname || "",
                "phone": basicInfo?.phone || "",
            });

            if (response.data.status === 200)
                defaultBasicInfo.current = basicInfo;
            else
                throw { message: response.data.message };

            dispatch(setToast({ open: true, message: response.data.message, type: response.data.data }));
        } catch (error: any) {
            dispatch(setToast({ open: true, message: error.message, type: 'error' }));
        }
    }

    const validationSchema: Yup.ObjectSchema<ChangePasswordValues> = Yup.object({
        oldPassword: Yup.string().max(255).required('Nhập mật khẩu cũ').max(255).min(8, 'Mật khẩu phải có ít nhất 8 kí tự'),
        newPassword: Yup.string().required('Nhập mật khẩu mới').max(255).min(8, 'Mật khẩu phải có ít nhất 8 kí tự'),
        confirmPassword: Yup.string().required('Nhập lại mật khẩu mới để xác nhận').oneOf([Yup.ref('newPassword')], 'Mật khẩu không trùng khớp').max(255),
    })

    const formPassword = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema,
        validateOnChange: true,
        validateOnMount: false,
        enableReinitialize: true,
        onSubmit: () => {

        }
    })

    const handleChangePasswordSubmit = async () => {
        try {
            const response = await doPost('user/change-password', {
                "id": id,
                "oldPassword": formPassword.values.oldPassword,
                "newPassword": formPassword.values.newPassword
            });

            if (response.data.status === 200)
                dispatch(setToast({ open: true, message: response.data.message, type: response.data.data }));
            else
                throw { message: response.data.message };
        } catch (error: any) {
            dispatch(setToast({ open: true, message: error.message, type: 'error' }));
        }
    }

    const handleDeleteAccount = async () => {
        try {
            const response = await doPost('user/delete-account', {
                "id": id
            });

            if (response.data.status === 200) {
                deleteLoginData();
                window.location.href = '/HomePage';
            }
            else
                throw { message: response.data.message };
        } catch (error: any) {
            dispatch(setToast({ open: true, message: error.message, type: 'error' }));
        }
    }

    const handleBasicInfo = () => {
        return (
            <Grid container rowSpacing={4} columns={{ xs: 4, lg: 9 }}>
                <Grid item xs={4} lg={9}>
                    <Box style={{ background: 'white', borderRadius: '16px', padding: '16px 16px' }}>
                        <Box display="flex" alignItems="center">
                            <h3 style={{ textAlign: 'left', color: 'black', marginRight: '8px' }}>
                                Thông tin cơ bản
                            </h3>
                            <div
                                style={{ color: Colors.black200, fontWeight: 500, cursor: 'pointer' }}
                                onClick={() => {
                                    setDisabledField(false);
                                }}>
                                Edit
                            </div>
                        </Box>

                        <Grid container columns={{ xs: 4, lg: 9 }} direction={isMobile ? 'column-reverse' : 'row'}>
                            <Grid item xs={4} lg={7}>
                                <Box marginBottom={2}>
                                    <CustomTextField
                                        label="Họ tên"
                                        textFieldProps={{ required: true, fullWidth: true, value: basicInfo?.fullname || '', onChange: handleFullnameChange, disabled: disabledField }} />
                                </Box>

                                <Box marginBottom={2}>
                                    <CustomTextField
                                        label="Email"
                                        textFieldProps={{ fullWidth: true, value: basicInfo?.email || '', disabled: true }} />
                                </Box>
                            </Grid>

                            <Grid item xs={4} lg={2}>
                                <Grid container justifyContent="center" alignItems="center">
                                    <Skeleton variant="circular" width={160} height={160} />
                                </Grid>
                            </Grid>

                            <Grid container columns={{ xs: 4, lg: 9 }}>
                                <Grid item xs={4} lg={9}>
                                    <Box marginBottom={2}>
                                        <CustomTextField
                                            label="Số điện thoại"
                                            textFieldProps={{ required: true, fullWidth: true, value: basicInfo?.phone || '', onChange: handlePhoneChange, disabled: disabledField }} />
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid item xs={4} lg={9} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-around', gap: '1rem' }}>
                                <CustomSelect
                                    label="Thành phố"
                                    rootStyle={{ width: isMobile ? '100%' : '50%' }}
                                    selectProps={{
                                        required: true,
                                        defaultValue: "",
                                        displayEmpty: true,
                                        fullWidth: true,
                                        disabled: disabledField
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
                                    rootStyle={{ width: isMobile ? '100%' : '50%' }}
                                    selectProps={{
                                        required: true,
                                        defaultValue: "",
                                        displayEmpty: true,
                                        fullWidth: true,
                                        disabled: disabledField
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
                        {!disabledField && (
                            <Grid container justifyContent="flex-start">
                                <Box marginTop={2}>
                                    <Button
                                        variant="text"
                                        size="large"
                                        onClick={() => {
                                            setBasicInfo(defaultBasicInfo.current);
                                            setDisabledField(true);
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                    <Button variant="contained" size="large" 
                                    onClick={() => {
                                      handleChangeBasicInfoSubmit()
                                      setDisabledField(true)
                                    }}>
                                        Lưu thay đổi
                                    </Button>
                                </Box>
                            </Grid>
                        )}

                    </Box>
                </Grid>

                <Grid item lg={12} xs={4}>
                    <Box style={{ background: 'white', borderRadius: '16px', padding: '16px 16px' }}>
                        <h3 style={{ textAlign: 'left', color: 'black' }}>Đổi mật khẩu</h3>
                        <Box marginBottom={2}>
                            <CustomTextField
                                label="Nhập mật khẩu cũ"
                                textFieldProps={{
                                    required: true,
                                    fullWidth: true,
                                    type: 'password',
                                    name: 'oldPassword',
                                    value: formPassword.values.oldPassword,
                                    onChange: formPassword.handleChange,
                                    onBlur: formPassword.handleBlur,
                                    error: (formPassword.touched.oldPassword && !!formPassword.errors.oldPassword),
                                    helperText: (formPassword.touched.oldPassword && formPassword.errors.oldPassword)
                                }}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <CustomTextField
                                label="Nhập mật khẩu mới"
                                textFieldProps={{
                                    name: 'newPassword',
                                    required: true,
                                    fullWidth: true,
                                    type: 'password',
                                    value: formPassword.values.newPassword,
                                    onChange: formPassword.handleChange,
                                    onBlur: formPassword.handleBlur,
                                    error: (formPassword.touched.newPassword && !!formPassword.errors.newPassword),
                                    helperText: (formPassword.touched.newPassword && formPassword.errors.newPassword)
                                }}
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <CustomTextField
                                label="Nhập lại mật khẩu mới"
                                textFieldProps={{
                                    name: 'confirmPassword',
                                    required: true,
                                    fullWidth: true,
                                    type: 'password',
                                    value: formPassword.values.confirmPassword,
                                    onChange: formPassword.handleChange,
                                    onBlur: formPassword.handleBlur,
                                    error: (formPassword.touched.confirmPassword && !!formPassword.errors.confirmPassword),
                                    helperText: (formPassword.touched.confirmPassword && formPassword.errors.confirmPassword)
                                }}
                            />
                        </Box>
                        <Grid container justifyContent="flex-start">
                            <Button
                                variant="text"
                                size="large"
                                onClick={() => {
                                    formPassword.setFieldValue('oldPassword', '');
                                    formPassword.setFieldValue('newPassword', '');
                                    formPassword.setFieldValue('confirmPassword', '');
                                    formPassword.setFieldTouched('oldPassword', false);
                                    formPassword.setFieldTouched('newPassword', false);
                                    formPassword.setFieldTouched('confirmPassword', false);
                                }}
                            >
                                Hủy
                            </Button>
                            <Button variant="contained" size="large" disabled={!formPassword.isValid} onClick={handleChangePasswordSubmit}>
                                Lưu thay đổi
                            </Button>
                        </Grid>
                    </Box>
                </Grid>

                <Dialog open={openPopup} onClose={() => setOpenPopup(false)} PaperProps={{style: { borderRadius: 16 }}}>
                    <Box style={{ padding: '16px 16px' }}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <HighlightOffIcon sx={{ width: '160px', height: '160px', color: Colors.orange500 }} />
                        </Box>

                        <h3 style={{ color: 'black' }}>Bạn có chắc chắn xóa tài khoản?</h3>
                        <Box display="flex" justifyContent="center" gap={2}>
                            <Button onClick={() => { setOpenPopup(false) }}>
                                Hủy
                            </Button>
                            <Button variant="contained" size="large" onClick={handleDeleteAccount}>
                                Xác nhận xóa
                            </Button>
                        </Box>
                    </Box>
                </Dialog>
                <Grid item lg={12} xs={4}>
                    <Box style={{ background: 'white', borderRadius: '16px', padding: '16px 16px' }}>
                        <h3 style={{ textAlign: 'left', color: 'black' }}>Xoá tài khoản</h3>
                        <p style={{ textAlign: 'justify', color: 'black' }}>Một khi tài khoản bị xóa, tất cả dữ liệu của bạn sẽ bị mất và không thể khôi phục tài khoản. Hãy lưu ý kỹ trước khi xác nhận xóa tài khoản.</p>
                        <Button variant="text" size="large" onClick={() => { setOpenPopup(true) }} style={{ display: 'flex' }}>Xoá tài khoản</Button>
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
                            ? <CustomTableDesktop headers={headers} rows={modifiedRows} />
                            : <CustomTableMobile rows={modifiedRows} />
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
                                <ListItemText primary="Đăng xuất"
                                    style={{ color: Colors.error }}
                                    onClick={() => {
                                        deleteLoginData();
                                        window.location.href = '/HomePage'
                                    }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>
        )
    }

    return (
        <>
            <Grid container columns={{ lg: 12, xs: 4 }} style={{ height: '100vh', width: '100vw' }}>
                {/* Header */}
                <Grid item lg={12} xs={4}>
                    <SearchAppBar />
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
                <Grid item lg={12} xs={4}>
                    <Footer />
                </Grid>
            </Grid>
            <Toast />
        </>
    )
}