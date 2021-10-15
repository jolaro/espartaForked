import faker from "faker";
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

function InventoryRequestsTable() {
  let classes = inventoryTableStyles();
  let items = [], status = ["Approved", "Pending", "Rejected"], roles = ["Commander", "Officer", "Soldier"],
    mockItems = "2x ItemA \n 2x ItemB";

  for (let i = 0; i < 15; i++) {
    items[i] =
      {
        id: Math.floor(Math.random() * 10000000),
        name: faker.name.findName(),
        role: roles[Math.floor(Math.random() * roles.length)],
        items: mockItems,
        Status: status[Math.floor(Math.random() * status.length)],
      };
  }
  return <TableContainer component={Paper} className={classes.tableContainer}>
    <Table sx={{ minWidth: 650 }} aria-label={"simple table"} className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableHeaderCell}>Id</TableCell>
          <TableCell className={classes.tableHeaderCell}>Name</TableCell>
          <TableCell className={classes.tableHeaderCell}>Role</TableCell>
          <TableCell className={classes.tableHeaderCell}>Items</TableCell>
          <TableCell className={classes.tableHeaderCell}>Status</TableCell>
          <TableCell className={classes.tableHeaderCell} />
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              {item.id}
            </TableCell>
            <TableCell className={classes.tableBodyCell}>{item.name}</TableCell>
            <TableCell className={classes.tableBodyCell}>{item.role}</TableCell>
            <TableCell className={classes.tableBodyCell}>{item.items}</TableCell>
            <TableCell className={classes.tableBodyCell}>{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>;
}

export default InventoryRequestsTable;
