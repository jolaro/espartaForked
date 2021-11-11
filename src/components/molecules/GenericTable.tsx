import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableCellProps,
  LinearProgress,
  Skeleton,
} from "@mui/material";
import React, { useMemo } from "react";
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
  loading?: boolean;
  loadingSkeletonsCount?: number;
}

const getColumnIds = (columns: ColumnConfig[]): string[] => {
  return columns.map((c) => c.id);
};

const SoldierAvailableItems: React.FC<SoldierAvailableItemsProps> = ({
  columns,
  rows,
  loading,
  loadingSkeletonsCount = 5,
}) => {
  const tableBody = useMemo(() => {
    const rowsToShow = !loading ? rows : new Array(loadingSkeletonsCount).fill({});

    return (
      <TableBody>
        {rowsToShow.map((row, i) => {
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
  }, [loading, rows, loadingSkeletonsCount, columns]);

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
        {tableBody}
      </Table>
      {loading && <LinearProgress color="inherit" />}
    </TableContainer>
  );
};

export default SoldierAvailableItems;
