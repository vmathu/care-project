import { useDispatch } from "react-redux";
import { AppDispatch } from "libs/redux/store";
import { setToast } from "libs/redux/slice/toastSlice";

import {
  Button,
  Grid,
  useMediaQuery,
  useTheme,
  InputAdornment,
  Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RegisterBackGround from "../../../assets/authen_background.svg";
import AppLogo from "../../../assets/app-logo.svg";

import Toast from "libs/ui/components/CustomToast";
import { CustomTextField, colors } from "libs/ui";
import { doPost } from "libs/utils/axios";

import * as Yup from "yup";
import { useFormik } from "formik";

import { saveLoginData, checkLoginToken } from "libs/utils/sessionHelper";
import { SignInFormProps, SignInFormValues } from "../interface";

import Quote from "../Component/quote";
import { Link } from "react-router-dom";

export default function SignIn() {
  if (checkLoginToken()) window.location.href = "/HomePage";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch<AppDispatch>();

  const logInField: SignInFormProps[] = [
    {
      header: "Email",
      name: "email",
      label: "",
      placeHolder: "",
      icon: <EmailOutlinedIcon />,
    },
    {
      header: "Mật khẩu",
      name: "password",
      label: "",
      placeHolder: "",
      icon: <LockOutlinedIcon />,
    },
  ];

  const validationSchema: Yup.ObjectSchema<SignInFormValues> = Yup.object({
    email: Yup.string()
      .email("Sai định dạng mail")
      .required("Bắt buộc nhập email")
      .max(255),
    password: Yup.string()
      .required("Bắt buộc nhập mật khẩu")
      .max(255)
      .min(8, "Mật khẩu phải có ít nhất 8 kí tự"),
  });

  const initialState: SignInFormValues = {
    email: "",
    password: "",
  };

  const formData = useFormik({
    initialValues: initialState,
    validationSchema,
    validateOnChange: true,
    validateOnMount: true,
    enableReinitialize: true,
    initialErrors: { email: "Email is required" },
    onSubmit: () => {},
  });

  const handleFinish = async () => {
    const data = formData.values;
    doPost("user/login", data)
      .then((res) => {
        const result = res.data;
        if (result.status != 200)
          throw { message: result.message, status: result.status };
        else {
          saveLoginData(result.data);
          window.location.href = "/HomePage";
        }
      })
      .catch((err) => {
        if (err.status == 400 || err.status == 500)
          window.location.href = `/Errors/${err.status}`;
        else
          dispatch(
            setToast({
              open: true,
              message: err.message,
              type: "error",
            }),
          );
      });
  };

  return (
    <Grid
      container
      columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
      style={{ width: "100vw" }}
    >
      {!isMobile && (
        <Grid item lg={6} md={4} sm={3}>
          <div
            style={{
              position: "relative",
              height: "calc(100vh - 0.5rem)",
              width: "100%",
            }}
          >
            <img
              src={RegisterBackGround}
              alt="RB"
              height="100vh"
              width="100%"
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Quote />
            </div>
          </div>
        </Grid>
      )}

      <Grid
        item
        lg={4}
        xs={4}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto 0 auto",
        }}
      >
        <img
          src={AppLogo}
          alt="ap-logo"
          style={{
            width: "fit-content",
            margin: "16px auto 40px auto",
          }}
        />
        <Typography variant="h3" sx={{ margin: "0 auto 1rem auto" }}>
          {" "}
          Thông tin tài khoản
        </Typography>
        {logInField.map((item: SignInFormProps) => {
          const { values, handleChange, errors, touched, handleBlur } =
            formData;
          return (
            <CustomTextField
              label={item.header}
              textFieldProps={{
                name: item.name,
                required: true,
                fullWidth: true,
                error: !!errors[item.name] && !!touched[item.name],
                helperText:
                  errors[item.name] && touched[item.name] && errors[item.name],
                InputLabelProps: { shrink: true },
                defaultValue: values[item.name],
                onBlur: handleBlur,
                onChange: handleChange,
                variant: "outlined",
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">{item.icon}</InputAdornment>
                  ),
                },
                style: { marginBottom: "16px" },
                type: item.name == "password" ? "password" : "text",
              }}
            />
          );
        })}
        <Button
          onClick={handleFinish}
          disabled={!formData.isValid}
          variant="contained"
          style={{ width: "100%", marginTop: "16px" }}
        >
          Đăng nhập
        </Button>
        <Toast />
        <Typography
          variant="caption"
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            fontWeight: 600,
            marginTop: "1rem",
            color: colors.black200,
          }}
        >
          Bạn đã có tài khoản?{" "}
          <Link
            to="/SignUp"
            style={{ color: colors.orange500, fontWeight: 700 }}
          >
            Đăng ký
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
