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

  detailsBoxElement: {
    flexGrow: 0,
  },

  itemsTableBox: {
    display: "flex",
    flexDirection: "column",
    rowGap: 0.5,
  },

  itemsTableHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  itemsTableHeaderName: {
    alignSelf: "flex-start",
  },

  itemsTableHeaderButton: {
    alignSelf: "flex-end",
  },
});

// CSS
export const soldierImg = {
  width: "100%",
  height: "auto",
};
