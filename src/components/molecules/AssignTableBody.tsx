import useTranslate from "../../hooks/useTranslate";
import GenericTable, { ColumnConfig, GenericTableRow } from "./GenericTable";
import { UserRole, RoleByAccessLevel } from "interfaces/Role";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import ApiService from "utils/api_service/api_service";
import { ItemTypeResponse, RequestItemResponse } from "utils/api_service/endpoints.config";
import { User } from "interfaces/User";
import { getUserRole } from "utils/get_user_role";

interface Assignation extends GenericTableRow {
  id: string;
  name: string;
  role: UserRole;
  items: string;
  status: string | boolean | null;
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

export const getRequestItemsAsString = (requestItems: RequestItemResponse[], itemTypes: ItemTypeResponse[]) => {
  let items = "";
  const itemsMonitor: string[] = [];

  for (let i = 0; i < requestItems.length; i++) {
    for (let i2 = 0; i2 < itemTypes.length; i2++) {
      if (itemTypes[i2].id.toString() === requestItems[i].item_type_id.toString()) {
        if (!itemsMonitor.includes(itemTypes[i2].id)) {
          items +=
            itemTypes[i2].name +
            " " +
            requestItems.filter((item) => item.item_type_id.toString() === itemTypes[i2].id.toString()).length +
            "\n";
          itemsMonitor.push(itemTypes[i2].id);
        }
      }
    }
  }
  return items;
};

export const getItemTypes = async () => {
  const response = await ApiService.get("/api/itemtypes");
  const itemTypes: ItemTypeResponse[] = [];
  for (let i = 0; i < response.data.length; i++) {
    itemTypes.push(response.data[i]);
  }
  return itemTypes;
};

export const getUsers = async () => {
  const response = await ApiService.get("/api/users");
  const users: User[] = [];

  for (let i = 0; i < response.data.length; i++) {
    users.push(response.data[i]);
  }
  return users;
};

export const getRoleComponent = (role: string) => {
  switch (role.toLowerCase()) {
    case UserRole.TROOP:
    case UserRole.COMMANDER:
    case UserRole.OFFICER:
    case UserRole.ADMIN:
    default:
      return <Chip icon={<PersonIcon />} label={role} />;
  }
};

export function AssignTableBody() {
  const t = useTranslate();
  const [rows, setRows] = useState<Assignation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = async () => {
    await getItemTypes().then(async itemTypes => {
      setLoading(true);
      const response = await ApiService.get("/api/requestgroup");
      const users: User[] = await getUsers();
      const newRows: Assignation[] = [];
  
      for (let i = 0; i < response.data.length; i++) {
        let request = response.data[i];
        // Get user assign to the reservation
        let user = users.find((user) => user.id.toString() === request.borrower_id.toString());
  
        if (request.approved) {
          newRows.push({
            id: request.id,
            name: user?.name ?? "",
            role: getUserRole(user?.access_level),
            items: getRequestItemsAsString(request.request_items, itemTypes).toString(),
            status: "0",
          });
        }
      }
      setRows(newRows);
      setLoading(false);
    });
  };

  const getStatusComponent = (request: Assignation) => {
    if (request?.status !== null) {
      if (request.status) {
        return <Chip icon={<CheckCircleIcon />} label={t("approved")} color="success" />;
      } else if (!request.status) {
        return <Chip icon={<CancelIcon />} label={t("rejected")} color="error" />;
      }
    } else {
      return <Chip icon={<PendingIcon />} label={t("pending")} />;
    }
  };

  const rowsToRender = rows.map((row) => ({
    ...row,
    role: getRoleComponent(row.role),
    status: getStatusComponent(row),
  }));

  useEffect(() => {
    fetch();
  }, []);

  return <GenericTable columns={columns} rows={rowsToRender} loading={loading} />;
}
