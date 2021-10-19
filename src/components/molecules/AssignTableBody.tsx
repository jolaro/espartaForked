import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { makeStyles, Typography } from "@material-ui/core";
import { inventoryTableClasses, inventoryTableStyles } from "../../styles/mui/inventoryTableStyles";
import useTranslate from "../../hooks/useTranslate";
import { CSSProperties } from "react";
import { Sx } from "../../styles/mui/_sx_interface";

export function AssignTableBody() {
  const t = useTranslate();
  let soldiers = [], status = [t("pendingForPickUp"), t("returned"), t("inUse")], roles = [t("commander"), t("officer"), t("troop")],
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

  function getStatusStyle(status: string) {
    let backgroundColor;
    if (status === t("returned")) {
      backgroundColor = "#4caf50";
    } else if (status === t("pendingForPickUp")) {
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
        <TableCell component="th" scope="row" sx={inventoryTableStyles.tableBodyCell}>
          {soldier.id}
        </TableCell>
        <TableCell sx={inventoryTableStyles.tableBodyCell}>{soldier.name}</TableCell>
        <TableCell sx={inventoryTableStyles.tableBodyCell}>{soldier.role}</TableCell>
        <TableCell sx={inventoryTableStyles.tableBodyCell}>{soldier.items}</TableCell>
        <TableCell sx={inventoryTableStyles.tableBodyCell}>
          <Typography className={inventoryTableClasses().itemQuantityStatus}
                      style={getStatusStyle(soldier.status)}>{soldier.status}
          </Typography>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>;
}