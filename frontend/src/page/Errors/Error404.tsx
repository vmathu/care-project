import { Button, Typography, useMediaQuery } from "@mui/material";
import { Footer, SearchAppBar } from "libs/ui";
import color from "libs/ui/color";
import Logo404 from "../../assets/404.svg";
import theme from "libs/ui/theme";

export default function Error404() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <SearchAppBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Typography variant="h3" color={color.orange800}>
          Page not found
        </Typography>
        <img
          src={Logo404}
          style={{ width: isMobile ? "100%" : "fit-content" }}
        />
        <Button variant="contained" size="large" href="/HomePage">
          Back to Home
        </Button>
      </div>
      <div style={{ width: "100%" }}>
        <Footer />
      </div>
    </div>
  );
}
