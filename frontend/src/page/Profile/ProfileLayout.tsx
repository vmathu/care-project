import Grid from "@mui/material/Grid";
import { useTheme, useMediaQuery, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import { SearchAppBar } from "libs/ui";
import { Footer } from "libs/ui";
import Toast from "libs/ui/components/CustomToast";
import Colors from "libs/ui/color";
import { checkLoginToken } from "libs/utils/sessionHelper";
import { deleteLoginData } from "libs/utils/sessionHelper";

// Children Components
import ViewBasicInfo from "./Component/ViewBasicInfo";
import ViewMyOrder from "./Component/ViewMyOrder";
import ViewMyFavorite from "./Component/ViewMyFavorite";
import ViewDetail from "./Component/ViewDetail";

export default function ProfileLayout() {
  if (!checkLoginToken()) window.location.href = "/HomePage";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Virtual Routes
  let children = <ViewBasicInfo />;
  let pathname = window.location.pathname;
  pathname += pathname[pathname.length - 1] === "/" ? "" : "/";

  if (pathname === "/Profile/MyOrder/Detail/") children = <ViewDetail />;

  if (pathname.startsWith("/Profile/MyOrder/")) {
    if (pathname.split("/").length == 5) children = <ViewDetail />;
    else children = <ViewMyOrder />;
  }

  if (pathname === "/Profile/MyFavorite/") children = <ViewMyFavorite />;

  const handleMenu = () => {
    return (
      <Box
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "16px 16px",
        }}
      >
        <nav aria-label="menu-bar">
          <Typography variant="h5">Cài đặt</Typography>
          <List>
            <ListItem>
              <ListItemButton
                onClick={() => (window.location.href = "/Profile")}
              >
                <ListItemText
                  primary="Thông tin cơ bản"
                  style={{ color: "black" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => (window.location.href = "/Profile/MyOrder")}
              >
                <ListItemText
                  primary="Đơn hàng của tôi"
                  style={{ color: "black" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => (window.location.href = "/Profile/MyFavorite")}
              >
                <ListItemText
                  primary="Quán yêu thích"
                  style={{ color: "black" }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton>
                <ListItemText
                  primary="Đăng xuất"
                  style={{ color: Colors.error }}
                  onClick={() => {
                    deleteLoginData();
                    window.location.href = "/HomePage";
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    );
  };

  return (
    <>
      <SearchAppBar />
      <Grid
        container
        style={{
          padding: isMobile ? "16px 16px" : "40px 80px",
          backgroundColor: "#D9D9D9",
        }}
        columnSpacing={4}
        columns={{ lg: 12, xs: 4 }}
      >
        {!isMobile && (
          <Grid item lg={3}>
            {handleMenu()}
          </Grid>
        )}

        <Grid item xs={4} lg={9}>
          {children}
        </Grid>
        <Toast />
      </Grid>
      <Footer />
    </>
  );
}
