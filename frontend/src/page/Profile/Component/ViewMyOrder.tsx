import Box from "@mui/system/Box";
import { useMediaQuery, useTheme, Typography, Grid } from "@mui/material";

import CustomTableDesktop from "./CustomTableDesktop";
import CustomTableMobile from "./CustomTableMobile";

export default function ViewMyOrder() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const rows = [];
  const statuses = ["waiting", "rejected", "completed"];

  for (let i = 1; i < 200; i++) {
    rows.push({
      id: i,
      fullname: "Sample " + i,
      orderDate: "2021-10-18T00:00:00.000Z",
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }

  const modifiedRows = rows.map((row) => ({
    ...row,
    orderDate: new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Bangkok",
    })
      .format(new Date(row.orderDate))
      .replace(/, /g, " "),
  }));

  const headers = ["ID đơn hàng", "Tên quán", "Ngày đặt hàng", "Trạng thái"];

  return (
    <Grid container rowSpacing={4} columns={{ xs: 4, lg: 9 }}>
      <Grid item xs={4} lg={9}>
        <Box
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "16px 16px",
          }}
        >
          <Typography variant="h3">Đơn hàng của tôi</Typography>
          {!isMobile ? (
            <CustomTableDesktop headers={headers} rows={modifiedRows} />
          ) : (
            <CustomTableMobile rows={modifiedRows} />
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
