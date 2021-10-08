import { Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import React, { useCallback } from "react";
import { useHistory } from "react-router";
import routes from "router/routes";
import bodyLayoutStyles from "styles/mui/bodyLayoutStyles";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const history = useHistory();

  const navigateTo = useCallback((path: string) => {
    history.push(path);
  }, []);

  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        {routes.map((route, index) => (
          <ListItem button key={route.title} sx={bodyLayoutStyles.listItem} onClick={() => navigateTo(route.path)}>
            {/* TODO: Icon in routes as well */}
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={route.title} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default NavBar;
