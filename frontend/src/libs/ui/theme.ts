import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { colors } from "./index";

const defaultTheme = createTheme({});
let theme = createTheme({
  palette: {
    primary: {
      main: colors.orange500,
    },
    success: {
      main: colors.success,
    },
    warning: { main: colors.warning },
    error: { main: colors.error },
  },
  typography: {
    fontFamily: '"Be Vietnam Pro", san-serif',
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            color: colors.white,
            "&:hover": {
              background: colors.orange600,
              boxShadow: "none",
            },
          },
        },
        {
          props: { variant: "contained", color: "inherit" },
          style: {
            background: colors.black50,
            color: colors.black200,
            "&:hover": {
              boxShadow: "none",
            },
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            "&:hover": {
              background: "rgba(251, 119, 18, 0.04)",
            },
          },
        },
        {
          props: { variant: "outlined", color: "inherit" },
          style: {
            background: "none",
            borderColor: colors.black100,
            color: colors.black200,
            "&:hover": {
              background: "none",
              borderColor: colors.black200,
            },
          },
        },
        {
          props: { variant: "text" },
          style: {
            "&:hover": {
              background: "rgba(251, 119, 18, 0.04)",
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          boxShadow: "none",
          textTransform: "inherit",
          "&.Mui-disabled": {
            background: colors.black50,
            color: colors.black200,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: '"Be Vietnam Pro", san-serif',
          borderColor: colors.black100,
          "&:hover": {
            borderColor: colors.black300,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            background: colors.orange50,
          },
          "&:hover": {
            background: "#FFF9F4",
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          caption: "div",
        },
      },
      styleOverrides: {
        h1: {
          fontWeight: "600",
        },
        h2: {
          fontWeight: "700",
        },
        h3: {
          fontWeight: "700",
        },
        h4: {
          fontWeight: "700",
        },
        h5: {
          fontWeight: "700",
        },
        body1: {
          [defaultTheme.breakpoints.down("sm")]: {
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: { color: "#EFD36E" },
        iconEmpty: { color: "#E6E6E6" },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
