import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import bodyLayoutStyles from "styles/mui/bodyLayoutStyles";
import MenuIcon from "@mui/icons-material/Menu";

interface TopbarProps {
  isMobile: boolean;
  onMenuIconClick?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ isMobile, onMenuIconClick }) => {
  const hamburgerMenuIcon = (
    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={onMenuIconClick}>
      <MenuIcon />
    </IconButton>
  );

  return (
    <AppBar position="static" sx={bodyLayoutStyles.appBar} elevation={0}>
      <Toolbar>
        {isMobile && hamburgerMenuIcon}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        language selector
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
