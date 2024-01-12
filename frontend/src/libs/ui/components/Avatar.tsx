import {
  Avatar,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import {
  Person,
  Menu as MenuIcon,
  Favorite,
  Logout,
} from "@mui/icons-material";
import { useState } from "react";
import React, { ReactNode } from "react";
import { colors } from "..";
import { Link } from "react-router-dom";
import { deleteLoginData } from "libs/utils/sessionHelper";

interface SampleMenuItemProps {
  icon: ReactNode;
  text: string;
  onClick: () => void;
}

const SampleMenuItem: React.FC<SampleMenuItemProps> = ({
  icon,
  text,
  onClick,
}) => (
  <MenuItem
    onClick={onClick}
    sx={{
      display: "flex",
      width: "220px",
      alignItems: "center",
      borderRadius: "8px",
      color: colors.black200,
    }}
  >
    <Box sx={{ paddingRight: "16px", display: "flex", alignItems: "center" }}>
      {icon}
    </Box>
    <Typography>{text}</Typography>
  </MenuItem>
);

export default function LetterAvatars() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Avatar
        style={{
          height: isMobile ? "40px" : "48px",
          width: isMobile ? "40px" : "48px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <img
          style={{ height: "100%", width: "100%" }}
          src="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?q=80&w=2200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </Avatar>
      <Box
        component={Menu}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          width: isMobile ? "auto" : "252px",
          height: isMobile ? "auto" : "240px",
          padding: "16px",
          borderRadius: "20px 0px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Link to="/Profile">
          <SampleMenuItem
            icon={<Person />}
            text="Thông tin cơ bản"
            onClick={handleClose}
          />
        </Link>
        <Link to="/Profile/MyOrder">
          <SampleMenuItem
            icon={<MenuIcon />}
            text="Đơn đặt chỗ của tôi"
            onClick={handleClose}
          />
        </Link>
        <Link to="/Profile/MyFavorite">
          <SampleMenuItem
            icon={<Favorite />}
            text="Quán yêu thích"
            onClick={handleClose}
          />
        </Link>
        <SampleMenuItem
          icon={<Logout />}
          text="Đăng xuất"
          onClick={() => {
            deleteLoginData();
            window.location.href = "/HomePage";
          }}
        />
      </Box>
    </div>
  );
}
