import React from "react";
import { BrowserRouter as ReactRouter, Switch, Route } from "react-router-dom";
import routes from "./routes";

const Router: React.FC = () => {
  return (
    <ReactRouter>
      <Switch>
        {routes.map((route) => (
          <Route path={route.path} exact={route.exact}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </ReactRouter>
  );
};

export default Router;
