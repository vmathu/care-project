import { useState } from 'react'
import { Button, MenuItem, Grid, useMediaQuery, useTheme, InputAdornment, Typography } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RegisterBackGround from '../../../assets/authen_background.svg'
import AppLogo from '../../../assets/app-logo.svg'
import { CustomTextField, CustomSelect } from 'libs/ui';
import { doPost } from 'libs/utils/axios';

import * as Yup from 'yup'
import { useFormik } from 'formik'

import { Role } from '../../../enum/enum'

import { SignUpFormProps, SignUpFormValues } from './interface'

import Steps from './Component/stepper'


export default function SignUp() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const [step, setStep] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")

    const PersonalInfoField: SignUpFormProps[] = [
        { header: "Họ và tên", name: "fullName", label: "", placeHolder: "", icon: <PersonOutlineOutlinedIcon /> },
        { header: "Email", name: "Email", label: "", placeHolder: "", icon: <EmailOutlinedIcon /> },
        { header: "Số điện thoại", name: "phoneNumber", label: "", placeHolder: "", icon: <LocalPhoneOutlinedIcon /> },
    ]

    const PasswordField: SignUpFormProps[] = [
        { header: "Mật khẩu", name: "Password", label: "", placeHolder: "", icon: <LockOutlinedIcon /> },
        { header: "Nhập lại mật khẩu", name: "ConfirmPassword", label: "", placeHolder: "", icon: <LockOutlinedIcon /> },
    ]

    const RoleField: Partial<SignUpFormProps>[] = [
        { header: "Vai trò", name: "Role", label: "", placeHolder: "" },
    ]

    const validationSchema: Yup.ObjectSchema<SignUpFormValues> = Yup.object({
        fullName: Yup.string().required('Không được bỏ trống'),
        Email: Yup.string().email('Sai định dạng mail').required('Bắt buộc nhập email').max(255),
        phoneNumber: Yup.string().required('Không được bỏ trống').max(255),
        Password: Yup.string().required('Bắt buộc nhập mật khẩu').max(255).min(8, 'Mật khẩu phải có ít nhất 8 kí tự'),
        ConfirmPassword: Yup.string().required('Bắt buộc xác nhận').oneOf([Yup.ref('Password')], 'Mật khẩu không trùng khớp').max(255),
        Role: Yup.number().oneOf([Role.Admin, Role.User, Role.Shop]).required('*')
    })

    const initialState: SignUpFormValues = {
        fullName: "",
        Email: "",
        phoneNumber: "",
        Password: "",
        ConfirmPassword: "",
        Role: 0
    }

    const formData = useFormik({
        initialValues: initialState,
        validationSchema,
        validateOnChange: true,
        validateOnMount: true,
        enableReinitialize: true,
        initialErrors: { Email: 'Email is required' },
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
        setErrorMessage("")
    }

    const handleFinish = () => {
        doPost('SignUp', formData.values)
            .then(async res => {
                alert(res?.data.message)
            })
            .catch(err => {
                setErrorMessage(err?.response.data.message)
            })
    }


    return (
        <Grid container columns={{ xs: 4, sm: 8, md: 12, lg: 12 }} style={{ width: '100vw' }}>
            {!isMobile &&
                <Grid item lg={6} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={RegisterBackGround} alt="RB" />
                </Grid>
            }

            <Grid item lg={4} xs={4} style={{ display: 'flex', flexDirection: 'column', margin: '0 auto 0 auto' }}>
                <img src={AppLogo} alt="ap-logo" style={{ width: 'fit-content', margin: '16px auto 40px auto' }} />
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
                                    value: formData.values.Role,
                                    onChange: formData.handleChange
                                }}
                            >
                                <MenuItem value={0} disabled style={{ display: "none" }}>
                                    Vai trò
                                </MenuItem>

                                <MenuItem value={Role.User}>
                                    Khách hàng
                                </MenuItem>

                                <MenuItem value={Role.Shop}>
                                    Chủ quán
                                </MenuItem>
                            </CustomSelect>
                        </>
                    )
                })}

                <div style={{ display: 'flex', justifyContent: step === 0 ? 'flex-end' : 'space-between' }}>
                    {step > 0 &&
                        <Button
                            onClick={back}
                            variant='contained'
                            style={{ width: isMobile ? '100%' : '40%', marginRight: '16px', marginTop: '16px' }}
                        >
                            Quay lại
                        </Button>
                    }
                    {step < 2 &&
                        <Button
                            onClick={next}
                            variant='contained'
                            style={{ width: isMobile ? '100%' : '40%', marginTop: '16px' }}
                        >
                            Tiếp theo
                        </Button>
                    }
                    {step === 2 &&
                        <Button
                            onClick={handleFinish}
                            disabled={!formData.isValid}
                            variant='contained'
                            style={{ width: isMobile ? '100%' : '40%', marginTop: '16px' }}
                        >Hoàn thành
                        </Button>
                    }
                </div>
                <Typography variant='body2' color='error' component='p' style={{ marginTop: '16px' }}>
                    {errorMessage}
                </Typography>
                {step === 0 &&
                    <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        Bạn đã có tài khoản?
                        <a href='/SignIn' style={{ color: 'orange' }}> Đăng nhập</a>
                    </p>}
            </Grid>
        </Grid>
    )
}