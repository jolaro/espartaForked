import React from "react";
import ReactDOM from "react-dom";
import theme from "config/theme";
import { ThemeProvider } from "@mui/material";
import "./styles/main.scss";
import "./config/i18n";
import Router from "router/Router";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
