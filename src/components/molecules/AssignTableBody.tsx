import useTranslate from "../../hooks/useTranslate";
import GenericTable, { ColumnConfig, GenericTableRow } from "./GenericTable";
import { Role } from "interfaces/Role";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import ApiService from "utils/api_service/api_service";
import { ItemTypeResponse, RequestItemResponse } from "utils/api_service/endpoints.config";
import { User } from "interfaces/User";
import { getRole } from "./SoldierFormDialog";

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

export function AssignTableBody() {
  const t = useTranslate();
  var itemTypes: ItemTypeResponse[] = [];
  const [isInit, setIsInit] = useState<boolean>(false);
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
      let user = users.find((user) => (user.id = request.borrower_id));

      if (request.approved) {
        newRows.push({
          id: request.id,
          name: user?.name ?? "",
          role: getRole(user?.access_level ?? Role.TROOP),
          items: (await getRequestItemsAsString(request.request_items)).toString(),
          status: t("approved"),
        });
      }
    }
    setRows(newRows);
    setLoading(false);
  };

  async function init() {
    itemTypes = await getItemTypes();
    fetch();
    setIsInit(true);
  }

  useEffect(() => {
    if (!isInit) {
      init();
    } else {
      fetch();
    }
  }, []);

  async function getUsers() {
    const response = await ApiService.get("/api/users");
    const users: User[] = [];

    for (let i = 0; i < response.data.length; i++) {
      users.push(response.data[i]);
    }
    return users;
  }

  async function getItemTypes() {
    const response = await ApiService.get("/api/itemtypes");
    const itemTypes: ItemTypeResponse[] = [];

    for (let i = 0; i < response.data.length; i++) {
      itemTypes.push(response.data[i]);
    }
    return itemTypes;
  }

  async function getRequestItemsAsString(requestItems: RequestItemResponse[]) {
    let items = "";
    const itemsMonitor: string[] = [];

    for (let i = 0; i < requestItems.length; i++) {
      for (let i2 = 0; i2 < itemTypes.length; i2++) {
        if (itemTypes[i2].id.toString() === requestItems[i].item_type_id.toString()) {
          if (!itemsMonitor.includes(itemTypes[i2].id)) {
            console.log(itemTypes[i2].id.toString());
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
  }

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

  return <GenericTable columns={columns} rows={rowsToRender} loading={loading} />;
}
