import { commonStyles } from "./commonStyles";
import { asStyle } from "./_sx_interface";

export const addItemDialogStyles = asStyle({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mt: 1,
  },
  row: {
    ...commonStyles.flex,
    gap: 1,
    "& > *:not(button)": {
      flex: 2,
    },
  },
});
