import { asStyle } from "./_sx_interface";

export const inventoryTableStyles = asStyle({
  table: {
    minWidth: 50,
  },
  tableContainer: {
    borderRadius: 8,
    marginLeft: "auto",
    marginRight: "auto",
    margin: "10px, 10px",
    maxWidth: 950,
    overflowX: "auto",
  },
  tableHeaderCell: {
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
    backgroundColor: "primary.main",
  },
  tableBodyCell: {
    textAlign: "center",
    backgroundColor: "white",
    color: "black",
  },
  itemQuantityStatus: {
    fontStyle: "bold",
    borderRadius: 8,
    backgroundColor: "gray",
    color: "white",
    padding: "3px 25px",
    display: "inline-block",
    verticalAlign: "center   ",
  },
});
