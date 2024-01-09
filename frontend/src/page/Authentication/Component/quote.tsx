import { Card, CardContent, Typography } from "@mui/material";
import { colors } from "libs/ui";

export default function Quote() {
  return (
    <Card
      sx={{ minWidth: "30%" }}
      style={{
        width: "30vw",
        flexShrink: "0",
        borderRadius: "40px",
        border: "3px solid #FEFEFE4D",
        background: "rgba(254, 254, 254, 0.30)",
        backdropFilter: "blur(10px)",
        paddingTop: "5%",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Typography
          variant="h1"
          sx={{ color: colors.white, textAlign: "center" }}
        >
          "Coffee for a nice morning"
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: colors.white,
            fontStyle: "italic",
            fontWeight: "600",
            alignSelf: "flex-end",
            paddingRight: "64px",
          }}
        >
          {" "}
          - JCXDC team -
        </Typography>
      </CardContent>
    </Card>
  );
}
