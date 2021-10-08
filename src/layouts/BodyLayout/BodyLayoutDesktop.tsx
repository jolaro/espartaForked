import { Drawer, Paper } from "@mui/material";
import { Box } from "@mui/system";
import Topbar from "components/molecules/Topbar";
import React from "react";
import { commonStyles } from "styles/mui/commonStyles";
import bodyLayoutStyles from "styles/mui/bodyLayoutStyles";

interface BodyLayoutProps {
  drawer: JSX.Element;
}

const BodyLayout: React.FC<BodyLayoutProps> = ({ drawer, children }) => {
  return (
    <Box sx={{ ...commonStyles.flex }}>
      <Drawer variant={"permanent"} anchor="left" sx={bodyLayoutStyles.drawer}>
        {drawer}
      </Drawer>
      <Box sx={{ flex: 1 }}>
        <Topbar isMobile={false} />
        <Paper sx={bodyLayoutStyles.container}>{children}</Paper>
      </Box>
    </Box>
  );
};

export default BodyLayout;
