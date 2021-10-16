import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@material-ui/core";
import { inventoryTableStyles } from "../../styles/mui/inventoryTableStyles";

export function RequestsTableBody() {
  let requests = [], status = ["Approved", "Pending", "Rejected"], roles = ["Commander", "Officer", "Soldier"],
    mockItems = "2x ItemA \n 2x ItemB";

  for (let i = 0; i < 15; i++) {
    requests[i] =
      {
        id: Math.floor(Math.random() * 10000000),
          name: "Name",
        role: roles[Math.floor(Math.random() * roles.length)],
        items: mockItems,
        status: status[Math.floor(Math.random() * status.length)],
      };
  }

  function getStatusStyle(request: any) {
    let backgroundColor;
    if (request == "Approved") {
      backgroundColor = "#4caf50";
    } else if (request == "Pending") {
      backgroundColor = "#ff9800";
    } else {
      backgroundColor = "#ef5350";
    }
    return { backgroundColor: backgroundColor };
  }

  return <TableBody>
    {requests.map((request) => (
      <TableRow
        key={request.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row" className={inventoryTableStyles().tableBodyCell}>
          {request.id}
        </TableCell>
        <TableCell className={inventoryTableStyles().tableBodyCell}>{request.name}</TableCell>
        <TableCell className={inventoryTableStyles().tableBodyCell}>{request.role}</TableCell>
        <TableCell className={inventoryTableStyles().tableBodyCell}>{request.items}</TableCell>
        <TableCell className={inventoryTableStyles().tableBodyCell}>
          <Typography className={inventoryTableStyles().itemQuantityStatus}
                      style={getStatusStyle(request.status)}>{request.status}
          </Typography>
        </TableCell>
        <TableCell className={inventoryTableStyles().tableBodyCell}>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>;
}