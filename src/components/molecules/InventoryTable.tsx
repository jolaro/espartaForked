import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { inventoryTableStyles } from "../../styles/mui/inventoryTableStyles";
import bodyLayoutStyles from "../../styles/mui/bodyLayoutStyles";

interface Props {
  headers?: Array<string>,
  children?: React.ReactNode
}

function InventoryTable(props: Props) {
  return <TableContainer component={Paper} sx={inventoryTableStyles.tableContainer}>
    <Table aria-label="simple table" sx={inventoryTableStyles.table}>
      <TableHead>
        <TableRow>
          {props.headers?.map((header) =>
            <TableCell key={header} sx={inventoryTableStyles.tableHeaderCell}>{header}</TableCell>,
          )}
        </TableRow>
      </TableHead>
      {props.children}
    </Table>
  </TableContainer>;
}

export default InventoryTable;