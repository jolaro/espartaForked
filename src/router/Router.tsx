import { useUser } from "hooks/useUser";
import { UserRole } from "interfaces/Role";
import Page404 from "pages/Page404";
import React, { useMemo } from "react";
import { BrowserRouter as ReactRouter, Switch, Route } from "react-router-dom";
import routes, { Route as RouteSetting } from "./routes";

enum RoutePermissions {
  RESTRICTED,
  UNAUTHORIZED,
}

export const roleFilter = (route: RouteSetting, userRole?: UserRole) => {
  if (!route.accessLevel || route.accessLevel.length === 0) return true;
  if (!userRole) return false;

  return route.accessLevel.includes(userRole);
};

const getRoutes = (permissions: RoutePermissions, userRole?: UserRole) =>
  routes
    .filter((route) => (permissions === RoutePermissions.RESTRICTED ? route.restricted : !route.restricted))
    .filter((route) => roleFilter(route, userRole))
    .map((route) => (
      <Route key={route.path} path={route.path} exact={route.exact}>
        <route.component />
      </Route>
    ));

const Router: React.FC = () => {
  const { isLoggedIn, user } = useUser();

  const restrictedRoutes = useMemo(() => getRoutes(RoutePermissions.RESTRICTED, user.get()?.role), [user]);
  const unauthorizedRoutes = useMemo(() => getRoutes(RoutePermissions.UNAUTHORIZED, user.get()?.role), [user]);

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
