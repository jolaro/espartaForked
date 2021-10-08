import { asStyle } from "./_sx_interface";

export const drawerWidth = 260;

const bodyLayoutStyles = asStyle({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    display: "block",
    "& .MuiDrawer-paper": {
      width: drawerWidth,
    },
  },
  listItem: {
    "&:hover": {
      backgroundColor: "primary.main",
      color: "primary.contrastText",
    },
  },
  appBar: {
    backgroundColor: "background.paper",
    backgroundImage: "none",
  },
  container: {
    m: 2,
    p: 2,
  },
});

export default bodyLayoutStyles;
