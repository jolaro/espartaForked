import StackRequestButtons from "./StackRequestButtons";
import useTranslate from "../../hooks/useTranslate";
import { useEffect, useState } from "react";
import GenericTable, { ColumnConfig, GenericTableRow } from "./GenericTable";
import { Chip } from "@mui/material";
import { UserRole } from "interfaces/Role";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { User } from "interfaces/User";
import ApiService from "utils/api_service/api_service";
import { getUserRole } from "utils/get_user_role";
import { ItemTypeResponse, RequestGroupResponse } from "utils/api_service/endpoints.config";
import { getItemTypes, getRequestItemsAsString, getRoleComponent, getUsers } from "./AssignTableBody";
import { useSnackbar } from "notistack";
import GlobalState from "state/GlobalState";

export interface Request extends GenericTableRow {
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

export function RequestsTableBody() {
  const t = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  var itemTypes: ItemTypeResponse[] = [];
  const [isInit, setIsInit] = useState<boolean>(false);
  const [rows, setRows] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const updateRequests = (request: Request) => {
    const requestsCopy: Request[] = [...rows];
    const index = requestsCopy.findIndex((c) => c.id.toString() === request.id.toString());
    requestsCopy[index] = request;
    setRows(requestsCopy);
  };

  const getRequests = async () => {
    setLoading(true);
    const response = await ApiService.get("/api/requestgroup", { manager_id: null });
    const users: User[] = await getUsers();
    const newRows: Request[] = [];

    for (let i = 0; i < response.data.length; i++) {
      let request = response.data[i];
      // Get user assign to the reservation
      let user = users.find((user) => user.id.toString() === request.borrower_id.toString());

      // TODO: Remove when manager_id == null works as query param
      if (request.approved === undefined || request.approved === null) {
        newRows.push({
          id: request.id,
          name: user?.name ?? "",
          role: getUserRole(user?.access_level),
          items: getRequestItemsAsString(request.request_items, itemTypes).toString(),
          status: request.approved ?? "",
        });
      }
    }
    setRows(newRows);
    setLoading(false);
  };

  async function handleRequest(request: Request) {
    try {
      console.log(request);
      const { data } = await ApiService.put(`/api/requestgroup/${request.id}`, {
        approved: request.status,
        manager_id: GlobalState.user?.id,
      });
      enqueueSnackbar(t("reservation.requestUpdateToast"), {
        variant: "success",
      });
      updateRequests(request);
    } catch (e) {
      enqueueSnackbar("Error: " + e, { variant: "error" });
    }
  }

  function getStatusComponent(request: Request) {
    switch (request.status) {
      case true: {
        return <Chip icon={<CheckCircleIcon />} label={t("approved")} color="success" />;
      }
      case false: {
        return <Chip icon={<CancelIcon />} label={t("rejected")} color="error" />;
      }
      default: {
        return <StackRequestButtons request={request} onHandleClick={handleRequest} />;
      }
    }
  }

  const rowsToRender = rows.map((row) => ({
    ...row,
    role: getRoleComponent(row.role),
    status: getStatusComponent(row),
  }));

  async function init() {
    itemTypes = await getItemTypes();
    getRequests();
    setIsInit(true);
  }

  useEffect(() => {
    if (!isInit) {
      init();
    } else {
      getRequests();
    }
  }, []);

  return <GenericTable columns={columns} rows={rowsToRender} loading={loading} />;
}
