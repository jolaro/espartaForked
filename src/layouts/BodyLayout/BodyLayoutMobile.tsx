import { Paper, SwipeableDrawer } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import bodyLayoutStyles from "styles/mui/bodyLayoutStyles";
import { useHookstate } from "@hookstate/core";
import Topbar from "components/molecules/Topbar";
import { commonStyles } from "styles/mui/commonStyles";

interface BodyLayoutMobileProps {
  drawer: JSX.Element;
}

const BodyLayoutMobile: React.FC<BodyLayoutMobileProps> = ({ drawer, children }) => {
  const isMenuOpen = useHookstate(false);

  return (
    <Box sx={{ ...commonStyles.flex }}>
      <SwipeableDrawer
        variant="temporary"
        open={isMenuOpen.get()}
        onClose={() => isMenuOpen.set(false)}
        onOpen={() => isMenuOpen.set(true)}
        anchor="left"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={bodyLayoutStyles.drawer}
      >
        {drawer}
      </SwipeableDrawer>
      <Box sx={{ flex: 1 }}>
        <Topbar isMobile={true} onMenuIconClick={() => isMenuOpen.set((prevState) => !prevState)} />
        <Paper sx={bodyLayoutStyles.container} elevation={0}>
          {children}
        </Paper>
      </Box>
    </Box>
  );
};

export default BodyLayoutMobile;
