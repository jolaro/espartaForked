import { Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import useTranslate from "hooks/useTranslate";
import React, { useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router";
import routes from "router/routes";
import bodyLayoutStyles from "styles/mui/bodyLayoutStyles";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const history = useHistory();
  const t = useTranslate();
  const match = useRouteMatch();

  const navigateTo = useCallback((path: string) => {
    history.push(path);
  }, []);

  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        {routes.map((route) => (
          <ListItem
            button
            selected={route.path === match.path}
            key={route.path}
            sx={bodyLayoutStyles.listItem}
            onClick={() => navigateTo(route.path)}
          >
            <ListItemIcon>{route.icon && <route.icon />}</ListItemIcon>
            <ListItemText primary={t(route.title)} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default NavBar;
