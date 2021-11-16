import useTranslate from "../../hooks/useTranslate";
import GenericTable, { ColumnConfig, GenericTableRow } from "./GenericTable";
import { Role } from "interfaces/Role";
import { Chip } from "@mui/material";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";

export interface Assignation extends GenericTableRow {
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
      width: "30%",
    },
  },
  {
    id: "status",
    title: "table.header.status",
    muiProps: {
      width: "15%",
      align: "right",
    },
  },
];

const mockRows: Assignation[] = [
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

export function AssignTableBody() {
  const t = useTranslate();
  const [rows, setRows] = useState<Assignation[]>(mockRows);

  function getStatusComponent(request: Assignation) {
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
        return <Chip icon={<PendingIcon />} label={request.status} />;
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

  const rowsToRender = rows.map((row) => ({
    ...row,
    role: getRoleComponent(row.role),
    status: getStatusComponent(row),
  }));

  return <GenericTable columns={columns} rows={rowsToRender} />;
}
