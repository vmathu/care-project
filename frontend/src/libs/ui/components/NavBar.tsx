import {
  AppBar,
  Toolbar,
  Box,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import LogoText from "../../../assets/app-logo-text.svg";
import Avatar from "./Avatar";
import colors from "../color";
import { CustomSearch } from ".";
import { checkLoginToken } from "libs/utils/sessionHelper";

type props = {
  value?: string;
};

export const SearchAppBar = ({ value }: props) => {
  const status = checkLoginToken();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: colors.white }}
      elevation={0}
    >
      <Toolbar style={{ padding: isMobile ? "4px 16px" : "12px 80px" }}>
        {/* <img src={LogoText} alt="logo" style={{ width: '', height: isMobile ? '20px' : '40px' }} /> */}
        <Link to="/">
          <img
            src={LogoText}
            alt="logo"
            style={{
              width: isMobile ? "100px" : "",
              height: isMobile ? "20px" : "40px",
              padding: isMobile ? "0 16px" : "",
            }}
          />
        </Link>
        <Box flexGrow={1} />
        <CustomSearch value={value} />
        <Box mr={2} />
        {status ? (
          <Avatar />
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link to="/SignIn">
              <Button variant="text">Đăng nhập</Button>
            </Link>
            <Link to="/SignUp">
              <Button variant="contained">Đăng ký</Button>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
