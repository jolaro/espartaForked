import { List, ListSubheader, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import useTranslate from "hooks/useTranslate";
import React, { useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router";
import routes, { Route } from "router/routes";
import bodyLayoutStyles from "styles/mui/bodyLayoutStyles";

interface NavBarListProps {
  group: string;
}

interface NavBarListItemProps {
  route: Route;
}

const NavBarListItem: React.FC<NavBarListItemProps> = ({ route }) => {
  const t = useTranslate();
  const history = useHistory();
  const match = useRouteMatch();

  const navigateTo = useCallback((path: string) => {
    history.push(path);
  }, []);

  return (
    <ListItem
      button
      selected={match.path.includes(route.path)}
      key={route.path}
      sx={bodyLayoutStyles.listItem}
      onClick={() => navigateTo(route.path)}
    >
      <ListItemIcon>{route.icon && <route.icon />}</ListItemIcon>
      <ListItemText primary={t(route.title)} />
    </ListItem>
  );
};
const NavBarList: React.FC<NavBarListProps> = ({ group }) => {
  return (
    <>
      <List subheader={<ListSubheader>{group}</ListSubheader>}>
        {routes
          .filter((r) => r.group === group && !r.hidden)
          .map((route) => (
            <NavBarListItem key={route.path} route={route} />
          ))}
      </List>
      <Divider />
    </>
  );
};

export default NavBarList;
