import React from "react";
import ReactDOM from "react-dom";
import theme from "config/theme";
import { ThemeProvider } from "@mui/material";
import "./styles/scss/main.scss";
import "./config/i18n";
import Router from "router/Router";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
