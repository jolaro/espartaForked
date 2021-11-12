import { asStyle } from "./_sx_interface";

export const reservationStyles = asStyle({
  addButton: {
    minWidth: 50,
  },

  detailsMainBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 10,
  },

  detailsBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },

  detailsBoxItem: {
    flexGrow: 0,
  },
});
