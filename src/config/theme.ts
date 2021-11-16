import { createTheme, ThemeOptions } from "@mui/material";
import { Shadows } from "@mui/material/styles/shadows";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#f5cc5a",
      contrastText: "#212121",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      paper: "#242424",
      default: "#f0f0f0",
    },
    error: {
      main: "#ed6161",
    },
    success: {
      main: "#ace06c",
    },
  },
};

export default createTheme(themeOptions);
