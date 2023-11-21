import React, { useState, FormEvent } from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  Box,
  useTheme,
  useMediaQuery,
  styled,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, Link } from "react-router-dom";
import LogoText from "../../../assets/app-logo-text.svg";
import Avatar from "./Avatar";
import colors from "../color";
import { CustomSearch } from ".";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "80px",
  marginRight: theme.spacing(2),
  width: "352px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchAppBar = ({}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchTerm !== "") {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: colors.white }}
      elevation={0}
    >
      <Toolbar style={{ padding: isMobile ? "16px" : "20px 80px" }}>
        {/* <img src={LogoText} alt="logo" style={{ width: '', height: isMobile ? '20px' : '40px' }} /> */}
        <img
          src={LogoText}
          alt="logo"
          style={{
            width: isMobile ? "100px" : "",
            height: isMobile ? "20px" : "40px",
            padding: isMobile ? "0 16px" : "",
          }}
        />
        <Box flexGrow={1} />
        <CustomSearch />
        <Box mr={2} />
        <Avatar />
      </Toolbar>
    </AppBar>
  );
};
