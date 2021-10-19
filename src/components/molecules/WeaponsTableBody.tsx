import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@material-ui/core";
import { inventoryTableClasses, inventoryTableStyles } from "../../styles/mui/inventoryTableStyles";
import useTranslate from "../../hooks/useTranslate";

export function WeaponsTableBody() {
  const t = useTranslate();
  let items = [], categories = [t("light"), t("medium"), t("heavy")];

  for (let i = 0; i < 15; i++) {
    items[i] =
      {
        id: Math.floor(Math.random() * 10000000),
        name: "faker.name.findName()",
        currentQuantity: Math.floor(Math.random() * 100),
        totalQuantity: Math.floor(Math.random() * 300),
        category: categories[Math.floor(Math.random() * categories.length)],
      };
  }

  function getQuantityStyle(item: any) {
    let backgroundColor;
    if (item.currentQuantity > item.totalQuantity * 0.60) {
      backgroundColor = "#03a9f4";
    } else if (item.currentQuantity > item.totalQuantity * 0.30) {
      backgroundColor = "#ff9800";
    } else {
      backgroundColor = "#ef5350";
    }
    return { backgroundColor: backgroundColor };
  }

  return <TableBody>
    {items.map((item) => (
      <TableRow
        key={item.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row" sx={inventoryTableStyles.tableBodyCell}>
          {item.id}
        </TableCell>
        <TableCell sx={inventoryTableStyles.tableBodyCell}>{item.name}</TableCell>
        <TableCell sx={inventoryTableStyles.tableBodyCell}>
          <Typography className={inventoryTableClasses().itemQuantityStatus}
                      style={getQuantityStyle(item)}>{item.currentQuantity}
          </Typography>
        </TableCell>
        <TableCell sx={inventoryTableStyles.tableBodyCell}>{item.category}</TableCell>
      </TableRow>
    ))}
  </TableBody>;
}