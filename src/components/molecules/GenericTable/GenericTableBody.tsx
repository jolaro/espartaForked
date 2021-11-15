import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import { ColumnConfig, GenericTableRow } from "./GenericTable";

interface GenericTableBodyProps {
  columns: ColumnConfig[];
  rows: GenericTableRow[];
  loading?: boolean;
}

const getColumnIds = (columns: ColumnConfig[]): string[] => {
  return columns.map((c) => c.id);
};

const GenericTableBody: React.FC<GenericTableBodyProps> = ({ columns, rows, loading }) => {
  return (
    <TableBody>
      {rows.map((row, i) => {
        const columnIds = getColumnIds(columns);
        return (
          <TableRow key={`row-${i}`} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {columnIds.map((columnId, columnIndex) => (
              <TableCell key={`value-${columnId}-${i}`} {...columns[columnIndex].muiProps}>
                {loading ? <Skeleton /> : row[columnId]}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default GenericTableBody;