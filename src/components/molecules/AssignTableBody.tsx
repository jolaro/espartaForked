import useTranslate from "../../hooks/useTranslate";
import GenericTable, { ColumnConfig, GenericTableRow } from "./GenericTable";
import { UserRole } from "interfaces/Role";
import { Avatar, Box, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import ApiService from "utils/api_service/api_service";
import { ItemTypeResponse, RequestItemResponse } from "utils/api_service/endpoints.config";
import { User } from "interfaces/User";
import { getUserRole } from "utils/get_user_role";
import ReturnItemDialog from "components/organisms/ReturnItemDialog";

interface Assignation extends GenericTableRow {
  id: string;
  name: string;
  role: UserRole;
  items: JSX.Element;
  status: string | boolean | null;
}

const columns: ColumnConfig[] = [
  {
    id: "id",
    title: "table.header.id",
    muiProps: {
      width: "5%",
    },
  },
  {
    id: "name",
    title: "table.header.personName",
    muiProps: {
      width: "20%",
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
      width: "40%",
    },
  },
  {
    id: "status",
    title: "table.header.status",
    muiProps: {
      width: "10%",
      align: "center",
    },
  },
  {
    id: "action",
    title: "table.header.actions",
    muiProps: {
      width: "5%",
      align: "right",
    },
  },
];

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

export const getItems = (items: RequestItemResponse[]) => {
  const itemsInfo = items.map((item) => {
    return {
      id: item.item_type.id,
      name: item.item_type.name,
    };
  });

  const itemsSet = [...new Set(itemsInfo.map((item) => item.id))];

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {itemsSet.map((itemId) => {
        const item = itemsInfo.find((it) => it.id === itemId);
        return (
          <Chip
            avatar={<Avatar>{items.filter((it) => it.item_type_id.toString() === item?.id.toString()).length}</Avatar>}
            label={item?.name}
            variant="outlined"
          />
        );
      })}
    </Box>
  );
};

export function AssignTableBody() {
  const t = useTranslate();
  const [rows, setRows] = useState<Assignation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = async () => {
    setLoading(true);
    const response = await ApiService.get("/api/requestgroup");
    const users: User[] = await getUsers();
    const newRows: Assignation[] = [];

    for (let i = 0; i < response.data.length; i++) {
      let request = response.data[i];
      // Get user assign to the reservation
      let user = users.find((user) => user.id.toString() === request.borrower_id.toString());

      if (request.approved && request.request_items.some((item) => item.date_returned === null)) {
        newRows.push({
          id: request.id,
          name: user?.name ?? "",
          role: getUserRole(user?.access_level),
          items: getItems(request.request_items),
          status: "0",
        });
      }
    }
    setRows(newRows);
    setLoading(false);
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

  const removeItem = (id: string) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
  };

  const rowsToRender = rows.map((row) => ({
    ...row,
    role: getRoleComponent(row.role),
    status: getStatusComponent(row),
    action: <ReturnItemDialog id={row.id} onReturn={() => removeItem(row.id)} />,
  }));

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <GenericTable columns={columns} rows={rowsToRender} loading={loading} />
    </>
  );
}
