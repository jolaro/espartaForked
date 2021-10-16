import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { inventoryTableStyles } from "../../styles/mui/inventoryTableStyles";
import { WeaponsTableBody } from "./WeaponsTableBody";
import { RequestsTableBody } from "./RequestsTableBody";
import { SoldiersTableBody } from "./SoldiersTableBody";

interface Props {
  item?: {
    id: "",
    name: "",

  };
  headers?: Array<string>;
  value?: Number;
}


function InventoryTable(props: Props) {

  function getTableBody() {
    if (props.value == 0) {
      return <WeaponsTableBody />;
    } else if (props.value == 1) {
      return <RequestsTableBody />;
    } else {
      return <SoldiersTableBody />;
    }
  }

  return <TableContainer component={Paper} className={inventoryTableStyles().tableContainer}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table" className={inventoryTableStyles().table}>
      <TableHead>
        <TableRow>
          {props.headers?.map((header) =>
            <TableCell key={header} className={inventoryTableStyles().tableHeaderCell}>{header}</TableCell>,
          )}
        </TableRow>
      </TableHead>
      {getTableBody()}
    </Table>
  </TableContainer>;
}

export default InventoryTable;