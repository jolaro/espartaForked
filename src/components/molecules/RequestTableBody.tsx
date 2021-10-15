import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@material-ui/core";
import { inventoryTableStyles } from "../../styles/mui/inventoryTableStyles";

export function RequestTableBody() {
  let items = [], status = ["Approved", "Pending", "Rejected"], roles = ["Commander", "Officer", "Soldier"],
    mockItems = "2x ItemA \n 2x ItemB";

  for (let i = 0; i < 15; i++) {
    items[i] =
      {
        id: Math.floor(Math.random() * 10000000),
          name: "Name",
        role: roles[Math.floor(Math.random() * roles.length)],
        items: mockItems,
        status: status[Math.floor(Math.random() * status.length)],
      };
  }


  return <TableBody>
    {items.map((item) => (
      <TableRow
        key={item.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row" className={inventoryTableStyles().tableBodyCell}>
          {item.id}
        </TableCell>
        <TableCell className={inventoryTableStyles().tableBodyCell}>{item.name}</TableCell>
        <TableCell className={inventoryTableStyles().tableBodyCell}>{item.items}</TableCell>
        {/*<TableCell className={inventoryTableStyles().tableBodyCell}>*/}
        {/*  <Typography className={inventoryTableStyles().itemQuantityStatus} style={*/}
        {/*               backgroundColor: 'white'*/}
        {/*    // ((item.currentQuantity > item.totalQuantity * 0.60 && "#03a9f4") ||*/}
        {/*    //   (item.currentQuantity > item.totalQuantity * 0.30 && "#ff9800") ||*/}
        {/*    //   (item.currentQuantity >= 0 && "#ef5350")),*/}
        {/*  }*/}
        {/*  >{item.currentQuantity}*/}
        {/*  </Typography>*/}
        {/*</TableCell>*/}
        <TableCell className={inventoryTableStyles().tableBodyCell}>{item.status}</TableCell>
        <TableCell className={inventoryTableStyles().tableBodyCell}>{item.role}</TableCell>
        <TableCell className={inventoryTableStyles().tableBodyCell}> </TableCell>
      </TableRow>
    ))}
  </TableBody>;
}