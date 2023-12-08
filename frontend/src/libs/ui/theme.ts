import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { colors } from "./index";

let theme = createTheme();
theme = createTheme(theme, {
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
    caption: {
      fontSize: "12px",
    },
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
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.875rem",
      },
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Be Vietnam Pro", san-serif',
        },
        gutterBottom: {
          marginBottom: "4px",
        },
      },
      defaultProps: {
        variantMapping: {
          caption: "div",
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { variant: "filled" },
          style: {
            "&:hover": {
              background: colors.black50,
            },
          },
        },
        {
          props: { variant: "text" },
          style: {
            background: "none",
            "&:hover": {
              background: "none",
              color: colors.black400,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: 600,
          color: colors.black200,
          [theme.breakpoints.down("sm")]: {
            fontSize: "11.2px",
            fontWeight: "500",
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            color: colors.white,
            "&:hover": {
              background: colors.orange600,
              boxShadow: "none",
              color: colors.white,
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
        {
          props: { size: "large" },
          style: {
            fontWeight: 700,
          },
        },
      ],
      styleOverrides: {
        root: {
          boxShadow: "none",
          textTransform: "inherit",
          fontFamily: '"Be Vietnam Pro", san-serif',
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
    MuiGrid: {
      styleOverrides: {
        item: { width: "100%" },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "12px 0",
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

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    text: true;
  }
}

export default theme;
