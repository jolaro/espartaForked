import React from "react";
import ReactDOM from "react-dom";
import theme from "config/theme";
import { ThemeProvider } from "@mui/material";
import "./styles/scss/main.scss";
import "./config/i18n";
import Router from "router/Router";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={4}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
