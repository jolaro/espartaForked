import faker from 'faker';
import { inventoryTableStyles } from "../../styles/mui/inventoryTableStyles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography,
} from "@material-ui/core";

function InventoryItemsTable() {
  let classes = inventoryTableStyles();
  let items = [], categories = ["Light", "Medium", "Heavy"];

  for (let i = 0; i < 15; i++) {
    items[i] =
      {
        id: Math.floor(Math.random() * 10000000),
        name: faker.name.findName(),
        currentQuantity: Math.floor(Math.random() * 100),
        totalQuantity: Math.floor(Math.random() * 300),
        category: categories[Math.floor(Math.random() * categories.length)],
      };
  }
  return <TableContainer component={Paper} className={classes.tableContainer}>
    <Table  sx={{ minWidth: 650 }}  aria-label="simple table" className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableHeaderCell}>Id</TableCell>
          <TableCell className={classes.tableHeaderCell}>Name</TableCell>
          <TableCell className={classes.tableHeaderCell}>Quantity</TableCell>
          <TableCell className={classes.tableHeaderCell}>Category</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              {item.id}
            </TableCell>
            <TableCell className={classes.tableBodyCell}>{item.name}</TableCell>
            <TableCell className={classes.tableBodyCell}>
              <Typography className={classes.itemQuantityStatus} style={{
                backgroundColor:
                  ((item.currentQuantity > item.totalQuantity * 0.60 && "#03a9f4") ||
                    (item.currentQuantity > item.totalQuantity * 0.30 && "#ff9800") ||
                    (item.currentQuantity >= 0 && "#ef5350")),
              }}>{item.currentQuantity}</Typography>
            </TableCell>
            <TableCell className={classes.tableBodyCell}>{item.category}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>;
}

export default InventoryItemsTable;
