import { createTheme } from "@mui/material";

export default createTheme({
  palette: {
    primary: {
      main: "#201E2C",
    },
    secondary: {
      main: "#6B7280",
    },

    text: {
      primary: "#0d0c0c",
      light: "#FFFFFF",
      disabled: "#c9c9c9",
    },
    background: {
      default: "#E5E7EB",
      paper: "#E5E7EB",
    },
  },

  typography: {

    fontSize: 16,
    fontFamily: "'Poppins', sans-serif",
    h3: {
      fontWeight: 500,
      fontSize: 24,
      color: "#111928",
    },
    h2: {
      fontWeight: 600,
      fontSize: 32,
      color: "#111928",
    },
  },
  components:{
    MuiInputBase: {
        defaultProps: {
          sx: {
            borderRadius: 1,
            "& fieldset": { borderColor: "#979797" },
          },
        },
      },
  },
  breakpoints: {
    values: {
      xsm: 400,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
  sizes: {
    sidebar: {
      main: 256,
    },
    header: {
      main: 72,
    },
  },
});
