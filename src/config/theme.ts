import { createTheme, ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#f8ff02",
      contrastText: "#202020",
    },
    secondary: {
      main: "#ff3d00",
    },
    background: {
      paper: "#121212",
      default: "#303030",
    },
  },
};

export default createTheme(themeOptions);
