import { makeStyles } from "@material-ui/core";

export const inventoryTableStyles = makeStyles((theme) => ({
  table: {
    minWidth: 50,
  },
  tableContainer: {
    borderRadius: 15,
    marginLeft: "auto",
    marginRight: "auto",
    margin: "10px, 10px",
    maxWidth: 950,
    overflowX: "auto",
  },
  tableHeaderCell: {
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#f8ff02",
    color: "black",
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
}));