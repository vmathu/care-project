import { AppBar, Toolbar, Box, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import LogoText from "../../../assets/app-logo-text.svg";
import Avatar from "./Avatar";
import colors from "../color";
import { CustomSearch } from ".";

export const SearchAppBar = ({}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: colors.white }}
      elevation={0}
    >
      <Toolbar style={{ padding: isMobile ? "16px" : "20px 80px" }}>
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
        <CustomSearch />
        <Box mr={2} />
        <Avatar />
      </Toolbar>
    </AppBar>
  );
};
