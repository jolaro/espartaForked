import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import bodyLayoutStyles from "styles/mui/bodyLayoutStyles";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageSwitcher from "./LanguageSwitcher";
import useTranslate from "hooks/useTranslate";
import { useRouteMatch } from "react-router-dom";
import routes from "router/routes";
import { useHookstate } from "@hookstate/core";

const DEFAULT_TITLE = "Esparta";

interface HamburgerIconProps {
  onMenuIconClick?: () => void;
}

interface TopbarProps extends HamburgerIconProps {
  isMobile: boolean;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ onMenuIconClick }) => (
  <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={onMenuIconClick}>
    <MenuIcon />
  </IconButton>
);

const Topbar: React.FC<TopbarProps> = ({ isMobile, onMenuIconClick }) => {
  const openedPageTitle = useHookstate(DEFAULT_TITLE);
  const t = useTranslate();
  const match = useRouteMatch();

  useEffect(() => {
    const route = routes.find((_r) => _r.path === match.path);
    const routeTitle = route ? t(route.title) : DEFAULT_TITLE;
    openedPageTitle.set(routeTitle);
  }, []);

  return (
    <AppBar position="static" sx={bodyLayoutStyles.appBar} elevation={0}>
      <Toolbar>
        {isMobile && <HamburgerIcon onMenuIconClick={onMenuIconClick} />}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {openedPageTitle.get()}
        </Typography>
        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
