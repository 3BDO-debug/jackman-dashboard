import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#496360",
    },
    secondary: {
      main: "#C4C4C4",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F3F5F7",
    },
    text: {
      primary: "#000000",
      secondary: "#020202",
    },
    error: {
      main: "#F24F4F",
    },
    success: {
      main: "#21D66A",
    },
    info: {
      main: "#438AFE",
    },
    divider: "#707070",
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "Montserrat",
    subtitle2: {
      fontSize: 16,
      fontWeight: 500,
    },
    h6: {
      fontWeight: 600,
      fontSize: 28,
    },
    body2: {
      fontSize: 16,
      fontWeight: 500,
    },
  },
});

export default theme;
