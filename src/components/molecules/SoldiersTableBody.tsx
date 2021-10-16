import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@material-ui/core";
import { inventoryTableStyles } from "../../styles/mui/inventoryTableStyles";

export function SoldiersTableBody() {
  let soldiers = [], status = ["Pending for pick up", "Returned", "In use"], roles = ["Commander", "Officer", "Soldier"],
    mockItems = "2x ItemA \n 2x ItemB";

  for (let i = 0; i < 15; i++) {
    soldiers[i] =
      {
        id: Math.floor(Math.random() * 10000000),
        name: "SoldierName",
        role: roles[Math.floor(Math.random() * roles.length)],
        items: mockItems,
        status: status[Math.floor(Math.random() * status.length)],
      };
  }

  function getStatusStyle(request: any) {
    let backgroundColor;
    if (request == "Returned") {
      backgroundColor = "#4caf50";
    } else if (request == "Pending for pick up") {
      backgroundColor = "#ff9800";
    } else {
      backgroundColor = "#ef5350";
    }
    return { backgroundColor: backgroundColor };
  }

  return <TableBody>
    {soldiers.map((soldier) => (
      <TableRow
        key={soldier.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row" className={inventoryTableStyles().tableBodyCell}>
          {soldier.id}
        </TableCell>
        <TableCell className={inventoryTableStyles().tableBodyCell}>{soldier.name}</TableCell>
        <TableCell className={inventoryTableStyles().tableBodyCell}>{soldier.role}</TableCell>
        <TableCell className={inventoryTableStyles().tableBodyCell}>{soldier.items}</TableCell>
        <TableCell className={inventoryTableStyles().tableBodyCell}>
          <Typography className={inventoryTableStyles().itemQuantityStatus}
                      style={getStatusStyle(soldier.status)}>{soldier.status}
          </Typography>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>;
}