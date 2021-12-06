import { Divider, List, Toolbar } from "@mui/material";
import NavBarList from "components/molecules/NavBarList";
import React, { useMemo } from "react";
import { roleFilter } from "router/Router";
import routes, { Route } from "router/routes";
import GlobalState from "state/GlobalState";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const groupedRoutes = useMemo(
    () =>
      routes
        .filter((route) => !route.hidden)
        .filter((route) => roleFilter(route, GlobalState.user?.role))
        .reduce((acc, curr) => {
          acc[curr.group] = [curr];
          return acc;
        }, {} as Record<string, Route[]>),
    [],
  );

  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        {Object.keys(groupedRoutes).map((group) => (
          <NavBarList key={group} group={group} />
        ))}
      </List>
    </>
  );
};

export default NavBar;
