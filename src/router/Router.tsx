import App from "App";
import React from "react";
import { BrowserRouter as ReactRouter, Switch, Route } from "react-router-dom";

const Router: React.FC = () => {
  return (
    <ReactRouter>
      <Switch>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </ReactRouter>
  );
};

export default Router;
