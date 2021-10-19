import { asStyle } from "./_sx_interface";

export const soldierAvailableItemsStyles = asStyle({
  tableHead: {
    backgroundColor: "primary.main",
    color: "primary.contrastText",

    "& *": {
      color: "primary.contrastText",
    },
  },
  requestDialogTextField: {
    width: "100%",
    margin: "10px auto",
  },
});
