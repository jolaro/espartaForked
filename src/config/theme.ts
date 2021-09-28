import { createTheme, ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#f8ff02",
    },
    secondary: {
      main: "#ff3d00",
    },
  },
};

export default createTheme(themeOptions);
