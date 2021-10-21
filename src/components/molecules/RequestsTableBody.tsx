import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { StackRequestButtons } from "./StackRequestButtons";
import useTranslate from "../../hooks/useTranslate";
import Box from "@mui/material/Box";
import { inventoryTableStyles } from "../../styles/mui/inventoryTableStyles";
import { useState } from "react";

enum Role {
  COMMANDER = "commander",
  OFFICER = "officer",
  TROOP = "troop",
}
interface Request {
  id: number;
  name: string;
  role: Role;
  items: string;
  status: string;
}

const mockupObjects = [
  {
    id: Math.floor(Math.random() * 10000000),
    name: "Name",
    role: Role.OFFICER,
    items: "2x ItemA \n 2x ItemB",
    status: "Pending",
  },
  {
    id: Math.floor(Math.random() * 10000000),
    name: "Name",
    role: Role.COMMANDER,
    items: "2x ItemA \n 2x ItemB",
    status: "Pending",
  },
];

export function RequestsTableBody() {
  const t = useTranslate();
  const [requests, setRequests] = useState<Request[]>(mockupObjects);

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

  // const updateStatus = (request: Request) => setRequestStatus(request);

  const updateRequests = (request: Request) => {
    const requestsCopy: Request[] = [...requests];

    for (let i = 0; i < requestsCopy.length - 1; i++) {
      if (requestsCopy[i].id === request.id) {
        requestsCopy[i] = request;
        break;
      }
    }

    setRequests(requestsCopy);
  };

  return (
    <TableBody>
      {requests.map((request) => (
        <TableRow key={request.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell component="th" scope="row" sx={inventoryTableStyles.tableBodyCell}>
            {request.id}
          </TableCell>
          <TableCell sx={inventoryTableStyles.tableBodyCell}>{request.name}</TableCell>
          <TableCell sx={inventoryTableStyles.tableBodyCell}>{request.role}</TableCell>
          <TableCell sx={inventoryTableStyles.tableBodyCell}>
            <Box sx={inventoryTableStyles.itemQuantityStatus} style={getStatusStyle(request.status)}>
              {request.status}
            </Box>
          </TableCell>
          <TableCell sx={inventoryTableStyles.tableBodyCell}>{request.items}</TableCell>
          <TableCell sx={inventoryTableStyles.tableBodyCell}>
            <StackRequestButtons request={request} onHandleClick={updateRequests} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
