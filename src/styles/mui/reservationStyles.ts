import { asStyle } from "./_sx_interface";

export const reservationStyles = asStyle({
  addButton: {
    minWidth: 50,
  },

  detailsMainBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    columnGap: "10px",
  },

  detailsBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },

  chipContainer: {
    marginTop: "1rem",
    display: "flex",
    gap: "5px",
    "& > *": {
      alignSelf: "flex-start",
    },
  },

  detailsBoxElement: {
    paddingTop: "0.5rem",
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

  sectionBox: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",

    "&:not(:first-child)": {
      marginTop: "1rem",
    },
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    width: "100%",
    marginBottom: "1rem",
  },
});

// CSS
export const soldierImg = {
  width: "100%",
  height: "auto",
};
