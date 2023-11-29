import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'libs/redux/store';
import { setToast } from 'libs/redux/slice/toastSlice';

import { Button, MenuItem, Grid, useMediaQuery, useTheme, InputAdornment, CircularProgress } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DoneIcon from '@mui/icons-material/Done';
import RegisterBackGround from '../../../assets/authen_background.svg'
import AppLogo from '../../../assets/app-logo.svg'

import Toast from 'libs/ui/components/CustomToast';
import { CustomTextField, CustomSelect } from 'libs/ui';
import { doPost } from 'libs/utils/axios';

import * as Yup from 'yup'
import { useFormik } from 'formik'

import { SignUpFormProps, SignUpFormValues } from '../interface'
import { checkLoginToken } from 'libs/utils/sessionHelper';

import Steps from '../Component/stepper'
import Quote from '../Component/quote';


export default function SignUp() {
    if (checkLoginToken()) window.location.href = '/HomePage'
    
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const [step, setStep] = useState(0)
    const toast = useSelector((state: RootState) => state.toastReducer)
    const dispatch = useDispatch<AppDispatch>()

    const PersonalInfoField: SignUpFormProps[] = [
        { header: "Họ và tên", name: "fullname", label: "", placeHolder: "", icon: <PersonOutlineOutlinedIcon /> },
        { header: "Email", name: "email", label: "", placeHolder: "", icon: <EmailOutlinedIcon /> },
        { header: "Số điện thoại", name: "phone", label: "", placeHolder: "", icon: <LocalPhoneOutlinedIcon /> },
    ]

    const PasswordField: SignUpFormProps[] = [
        { header: "Mật khẩu", name: "password", label: "", placeHolder: "", icon: <LockOutlinedIcon /> },
        { header: "Nhập lại mật khẩu", name: "ConfirmPassword", label: "", placeHolder: "", icon: <LockOutlinedIcon /> },
    ]

    const RoleField: Partial<SignUpFormProps>[] = [
        { header: "Vai trò", name: "role", label: "", placeHolder: "" },
    ]

    const validationSchema: Yup.ObjectSchema<SignUpFormValues> = Yup.object({
        fullname: Yup.string().required('Không được bỏ trống'),
        email: Yup.string().email('Sai định dạng mail').required('Bắt buộc nhập email').max(255),
        phone: Yup.string().required('Không được bỏ trống').max(255),
        password: Yup.string().required('Bắt buộc nhập mật khẩu').max(255).min(8, 'Mật khẩu phải có ít nhất 8 kí tự'),
        ConfirmPassword: Yup.string().required('Bắt buộc xác nhận').oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp').max(255),
        role: Yup.string().oneOf(["admin", "user", "shop"]).required('*')
    })

    const initialState: SignUpFormValues = {
        fullname: "",
        email: "",
        phone: "",
        password: "",
        ConfirmPassword: "",
        role: "",
    }

    const formData = useFormik({
        initialValues: initialState,
        validationSchema,
        validateOnChange: true,
        validateOnMount: true,
        enableReinitialize: true,
        initialErrors: { email: 'Email is required' },
        onSubmit: () => {
        }
    })

    const next = () => {
        if (step < 2) {
            setStep((cur) => cur + 1)
        }
    }

    const back = () => {
        if (step > 0) {
            setStep((cur) => cur - 1)
        }
    }

    const handleFinish = () => {
        const data = formData.values

        doPost('user/register', data)
            .then(async res => {
                const resData = res.data;
                if (resData.status != 200)
                    throw { message: resData.message, status: resData.status }
                else {
                    dispatch(setToast({ ...toast, open: true, message: resData.message, title: "Success!", type: 'success' }))
                    setTimeout(() => {
                        window.location.href = '/SignIn'
                    }, 3000)
                }
            })
            .catch(err => {
                if (err.status == 400 || err.status == 500)
                    window.location.href = `/Errors/${err.status}`
                else
                    dispatch(setToast({ ...toast, open: true, message: err.message, title: 'Error', type: 'error' }))
            })
    }

    return (
            <Grid container columns={{ xs: 4, sm: 8, md: 12, lg: 12 }} style={{ width: '100vw' }}>
                {!isMobile &&
                    <Grid item lg={6} md={4} sm={3}>
                        <div style={{
                            position: 'relative',
                            height: 'calc(100vh - 0.5rem)',
                            width: '100%'
                        }}>
                            <img
                                src={RegisterBackGround}
                                alt="RB"
                                height="100%"
                                width="100%"
                                style={{ objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: '20px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}>
                                <Quote />
                            </div>
                        </div>
                    </Grid>
                }

                <Grid item lg={4} xs={4} style={{ display: 'flex', flexDirection: 'column', margin: '0 auto 0 auto' }}>
                    <img
                        src={AppLogo}
                        alt="ap-logo"
                        style={{
                            width: 'fit-content',
                            margin: '16px auto 40px auto'
                        }} />
                    <Steps currStep={step} />
                    {step === 0 &&
                        <>
                            <h3 style={{ margin: '16px auto 0 auto' }}>Thông tin cá nhân</h3>
                            {PersonalInfoField.map((item: SignUpFormProps) => {
                                const { values, handleChange, errors, touched, handleBlur } = formData
                                return (
                                    <CustomTextField
                                        label={item.header}
                                        textFieldProps={{
                                            name: item.name,
                                            required: true,
                                            fullWidth: true,
                                            error: !!errors[item.name] && !!touched[item.name],
                                            helperText: (errors[item.name] && touched[item.name] && errors[item.name]),
                                            InputLabelProps: { shrink: true },
                                            defaultValue: values[item.name],
                                            onBlur: handleBlur,
                                            onChange: handleChange,
                                            variant: 'outlined',
                                            InputProps: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {item.icon}
                                                    </InputAdornment>
                                                )
                                            },
                                            style: { marginBottom: '16px' }
                                        }}
                                    />
                                )
                            })}
                        </>
                    }

                    {step === 1 &&
                        <>
                            <h3 style={{ margin: '16px auto 0 auto' }}>Nhập mật khẩu</h3>
                            {PasswordField.map((item: SignUpFormProps) => {
                                const { values, handleChange, errors, touched, handleBlur } = formData
                                return (
                                    <CustomTextField
                                        label={item.header}
                                        textFieldProps={{
                                            name: item.name,
                                            required: true,
                                            fullWidth: true,
                                            error: !!errors[item.name] && !!touched[item.name],
                                            helperText: (errors[item.name] && touched[item.name] && errors[item.name]),
                                            InputLabelProps: { shrink: true },
                                            defaultValue: values[item.name],
                                            onBlur: handleBlur,
                                            onChange: handleChange,
                                            variant: 'outlined',
                                            type: 'password',
                                            InputProps: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {item.icon}
                                                    </InputAdornment>
                                                )
                                            },
                                            style: { marginBottom: '16px' }
                                        }}
                                    />
                                )
                            })}
                        </>
                    }

                    {step === 2 && RoleField.map((item: Partial<SignUpFormProps>) => {
                        return (
                            <>
                                <h3 style={{ margin: '16px auto 0 auto' }}>{item.header}* </h3>
                                <CustomSelect
                                    label='Chọn Vai trò'
                                    selectProps={{
                                        name: item.name,
                                        required: true,
                                        displayEmpty: true,
                                        fullWidth: true,
                                        value: formData.values.role,
                                        onChange: formData.handleChange
                                    }}
                                >
                                    <MenuItem value={""} disabled style={{ display: "none" }}>
                                        Vai trò
                                    </MenuItem>

                                    <MenuItem value={"user"}>
                                        Khách hàng
                                    </MenuItem>

                                    <MenuItem value={"shop"}>
                                        Chủ quán
                                    </MenuItem>
                                </CustomSelect>
                            </>
                        )
                    })}

                    <div style={{
                        display: 'flex',
                        justifyContent: step === 0 ? 'flex-end' : 'space-between',
                        gap: '16px'
                    }}>
                        {step > 0 &&
                            <Button
                                onClick={back}
                                variant='contained'
                                size='large'
                                style={{ width: '100%', marginTop: '16px' }}
                                startIcon={<ArrowBackIosNewIcon />}
                            >
                                Quay lại
                            </Button>
                        }
                        {step < 2 &&
                            <Button
                                onClick={next}
                                variant='contained'
                                size='large'
                                style={{ width: '100%', marginTop: '16px' }}
                                endIcon={<ArrowForwardIosIcon />}
                            >
                                Tiếp theo
                            </Button>
                        }
                        {step === 2 &&
                            <Button
                                onClick={handleFinish}
                                disabled={!formData.isValid}
                                variant='contained'
                                style={{ width: '100%', marginTop: '16px' }}
                                endIcon={<DoneIcon />}
                            >Hoàn thành
                            </Button>
                        }
                    </div>
                    <Toast />
                    {step === 0 &&
                        <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            Bạn đã có tài khoản?
                            <a href='/SignIn' style={{ color: 'orange' }}>
                                Đăng nhập
                            </a>
                        </p>
                    }
                </Grid>
            </Grid>
    )
}