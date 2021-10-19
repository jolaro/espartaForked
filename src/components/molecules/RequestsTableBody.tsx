import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@material-ui/core";
import { inventoryTableClasses, inventoryTableStyles } from "../../styles/mui/inventoryTableStyles";
import { StackRequestButtons } from "./StackRequestButtons";
import useTranslate from "../../hooks/useTranslate";

export function RequestsTableBody() {
  const t = useTranslate();
  let requests = [], status = [t("approved"), t("pending"), t("rejected")], roles = [t("commander"), t("officer"), t("troop")],
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
    if (request === t("approved")) {
      backgroundColor = "#4caf50";
    } else if (request === t("pending")) {
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
        <TableCell component="th" scope="row" sx={inventoryTableStyles.tableBodyCell}>
          {request.id}
        </TableCell>
        <TableCell sx={inventoryTableStyles.tableBodyCell}>{request.name}</TableCell>
        <TableCell sx={inventoryTableStyles.tableBodyCell}>{request.role}</TableCell>
        <TableCell sx={inventoryTableStyles.tableBodyCell}>
          <Typography className={inventoryTableClasses().itemQuantityStatus}
                      style={getStatusStyle(request.status)}>{request.status}
          </Typography>
        </TableCell>
        <TableCell sx={inventoryTableStyles.tableBodyCell}>{request.items}</TableCell>
        <TableCell sx={inventoryTableStyles.tableBodyCell}>
          <StackRequestButtons request={request}/>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>;
}