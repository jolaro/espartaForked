import StackRequestButtons from "./StackRequestButtons";
import useTranslate from "../../hooks/useTranslate";
import { useState } from "react";
import GenericTable, { ColumnConfig, GenericTableRow } from "./GenericTable";
import { Chip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Role } from "interfaces/Role";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export interface Request extends GenericTableRow {
  id: string;
  name: string;
  role: Role;
  items: string;
  status: string;
}

const columns: ColumnConfig[] = [
  {
    id: "id",
    title: "table.header.id",
    muiProps: {
      width: "10%",
    },
  },
  {
    id: "name",
    title: "table.header.personName",
    muiProps: {
      width: "30%",
    },
  },
  {
    id: "role",
    title: "table.header.role",
    muiProps: {
      width: "10%",
      align: "center",
    },
  },
  {
    id: "items",
    title: "table.header.items",
    muiProps: {
      width: "37%",
    },
  },
  {
    id: "status",
    title: "table.header.status",
    muiProps: {
      width: "8%",
      align: "right",
    },
  },
];

const mockRows: Request[] = [
  {
    id: Math.floor(Math.random() * 10000000).toString(),
    name: "Jeniffer Lawrence",
    role: Role.OFFICER,
    items: "2x ItemA \n 2x ItemB",
    status: "Rejected",
  },
  {
    id: Math.floor(Math.random() * 10000000).toString(),
    name: "Sergio Ramos",
    role: Role.COMMANDER,
    items: "2x ItemA \n 2x ItemB",
    status: "Pending",
  },
  {
    id: Math.floor(Math.random() * 10000000).toString(),
    name: "Ballada Mallada",
    role: Role.TROOP,
    items: "2x ItemA \n 2x ItemB",
    status: "Pending",
  },
  {
    id: Math.floor(Math.random() * 10000000).toString(),
    name: "Justin Bieber",
    role: Role.COMMANDER,
    items: "2x ItemA \n 2x ItemB",
    status: "Approved",
  },
];

export function RequestsTableBody() {
  const t = useTranslate();
  const [rows, setRows] = useState<Request[]>(mockRows);

  function getStatusComponent(request: Request) {
    switch (request.status.toLowerCase()) {
      case "approved": {
        return <Chip icon={<CheckCircleIcon />} label={request.status} color="success" />;
      }
      case "rejected":
      case "denied": {
        return <Chip icon={<CancelIcon />} label={request.status} color="error" />;
      }
      default:
      case "pending": {
        return <StackRequestButtons request={request} onHandleClick={updateRequests} />;
      }
    }
  }

  const getRoleComponent = (role: string) => {
    switch (role.toLowerCase()) {
      case Role.TROOP:
      case Role.COMMANDER:
      case Role.OFFICER:
      default:
        return <Chip icon={<PersonIcon />} label={role} />;
    }
  };

  const updateRequests = (request: Request) => {
    const requestsCopy: Request[] = [...rows];

    for (let i = 0; i < requestsCopy.length; i++) {
      if (requestsCopy[i].id.toString() === request.id.toString()) {
        requestsCopy[i] = request;
        break;
      }
    }
    setRows(requestsCopy);
  };

  const rowsToRender = rows.map((row) => ({
    ...row,
    role: getRoleComponent(row.role),
    status: getStatusComponent(row),
  }));

  return <GenericTable columns={columns} rows={rowsToRender} />;
}
