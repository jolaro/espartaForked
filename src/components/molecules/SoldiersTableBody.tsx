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
        {/*<TableCell className={inventoryTableStyles().tableBodyCell}>*/}
        {/*  <Typography className={inventoryTableStyles().itemQuantityStatus} style={*/}
        {/*               backgroundColor: 'white'*/}
        {/*    // ((soldier.currentQuantity > soldier.totalQuantity * 0.60 && "#03a9f4") ||*/}
        {/*    //   (soldier.currentQuantity > soldier.totalQuantity * 0.30 && "#ff9800") ||*/}
        {/*    //   (soldier.currentQuantity >= 0 && "#ef5350")),*/}
        {/*  }*/}
        {/*  >{soldier.currentQuantity}*/}
        {/*  </Typography>*/}
        {/*</TableCell>*/}
        <TableCell className={inventoryTableStyles().tableBodyCell}>{soldier.items}</TableCell>
        <TableCell className={inventoryTableStyles().tableBodyCell}>{soldier.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>;
}