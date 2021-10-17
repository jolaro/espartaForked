import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableCellProps } from "@mui/material";
import React from "react";
import { soldierAvailableItemsStyles } from "styles/mui/soldierAvailableItemsStyles";

export interface ColumnConfig {
  title: string;
  id: string;
  muiProps?: TableCellProps;
}

export type GenericTableRow = {
  [key: string]: string | JSX.Element;
};

interface SoldierAvailableItemsProps {
  columns: ColumnConfig[];
  rows: GenericTableRow[];
}

const getColumnIds = (columns: ColumnConfig[]): string[] => {
  return columns.map((c) => c.id);
};

const SoldierAvailableItems: React.FC<SoldierAvailableItemsProps> = ({ columns, rows }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} sx={soldierAvailableItemsStyles.tableHead} {...column.muiProps}>
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            const columnIds = getColumnIds(columns);
            return (
              <TableRow key={`row-${i}`} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                {columnIds.map((columnId, columnIndex) => (
                  <TableCell key={`value-${columnId}-${i}`} {...columns[columnIndex].muiProps}>
                    {row[columnId]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SoldierAvailableItems;
