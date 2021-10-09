import { useUser } from "hooks/useUser";
import Page404 from "pages/Page404";
import React, { useMemo } from "react";
import { BrowserRouter as ReactRouter, Switch, Route } from "react-router-dom";
import routes from "./routes";

enum RoutePermissions {
  RESTRICTED,
  UNAUTHORIZED,
}

const getRoutes = (permissions: RoutePermissions) =>
  routes
    .filter((route) => (permissions === RoutePermissions.RESTRICTED ? route.restricted : !route.restricted))
    .map((route) => (
      <Route key={route.path} path={route.path} exact={route.exact}>
        <route.component />
      </Route>
    ));

const Router: React.FC = () => {
  const { isLoggedIn } = useUser();

  const restrictedRoutes = useMemo(() => getRoutes(RoutePermissions.RESTRICTED), []);
  const unauthorizedRoutes = useMemo(() => getRoutes(RoutePermissions.UNAUTHORIZED), []);

  return (
    <ReactRouter>
      <Switch>
        {isLoggedIn.get() && restrictedRoutes}
        {unauthorizedRoutes}
        <Route component={Page404} />
      </Switch>
    </ReactRouter>
  );
};

export default Router;
