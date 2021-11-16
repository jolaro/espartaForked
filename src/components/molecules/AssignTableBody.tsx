import useTranslate from "../../hooks/useTranslate";
import GenericTable, { ColumnConfig, GenericTableRow } from "./GenericTable";
import { Role } from "interfaces/Role";
import { Chip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ItemResponse, RequestGroupResponse, RequestItemResponse } from "utils/api_service/endpoints.config";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ApiService from "utils/api_service/api_service";

export interface Assignation extends GenericTableRow {
  id: string;
  name: string;
  role: Role;
  items: any;
  status: string;
}

const columns: ColumnConfig[] = [
  {
    id: "id",
    title: "ID",
    muiProps: {
      width: "10%",
    },
  },
  {
    id: "name",
    title: "Person Name",
    muiProps: {
      width: "30%",
    },
  },
  {
    id: "role",
    title: "Role",
    muiProps: {
      width: "10%",
      align: "center",
    },
  },
  {
    id: "items",
    title: "Items",
    muiProps: {
      width: "30%",
    },
  },
  {
    id: "status",
    title: "Status",
    muiProps: {
      width: "15%",
      align: "right",
    },
  },
];

interface ArrowIconProps {
  items?: RequestItemResponse[];
}

function ArrowIcon(props: ArrowIconProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        Items
      </IconButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense sx={{ width: "100%" }}>
          {props.items?.map((item) => {
            const labelId = `checkbox-list-secondary-label-${item}`;
            return (
              <ListItem key={item.id} disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={`Avatar n°${item.id + 1}`} src={`/static/images/avatar/${item.id + 1}.jpg`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.item_id}
                    secondary={
                      <React.Fragment>
                        <Box>
                          <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                            Id: {item.id}
                          </Typography>
                        </Box>
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
// const mockRows: Assignation[] = [
//   {
//     items: <ArrowIcon />,
//     id: Math.floor(Math.random() * 10000000).toString(),
//     name: "Jeniffer Lawrence",
//     role: Role.OFFICER,
//     status: "Rejected",
//   },
//   {
//     items: <ArrowIcon />,
//     id: Math.floor(Math.random() * 10000000).toString(),
//     name: "Sergio Ramos",
//     role: Role.COMMANDER,
//     status: "Pending",
//   },
//   {
//     items: <ArrowIcon />,
//     id: Math.floor(Math.random() * 10000000).toString(),
//     name: "Ballada Mallada",
//     role: Role.TROOP,
//     status: "Pending",
//   },
//   {
//     items: <ArrowIcon />,
//     id: Math.floor(Math.random() * 10000000).toString(),
//     name: "Justin Bieber",
//     role: Role.COMMANDER,
//     status: "Approved",
//   },
// ];

export function AssignTableBody() {
  const t = useTranslate();
  const [rows, setRows] = useState<GenericTableRow[]>([]);

  useEffect(() => {
    fetchReservation();
  }, []);

  const fetchReservation = useCallback(async () => {
    const newRows: GenericTableRow[] = [];
    const responseRequestGroups = await ApiService.unsafeGet("/api/requestgroup");
    const responseRequestItem = await ApiService.get("/api/requestitem/");

    const requestGroups: RequestGroupResponse[] = responseRequestGroups.data;
    const requestItems: RequestItemResponse[] = responseRequestItem.data;

    console.log(requestItems);

    for (let i = 0; i < requestGroups.length; i++) {
      for (let i2 = 0; i2 < requestItems.length; i2++) {
          if (Number(requestGroups[i].id) === requestItems[i2].item_id) {
            requestGroups[i].requestItems?.push(requestItems[i2]);
          }
      }
    }
    for (let i = 0; i < requestGroups.length; i++) {
      newRows.push({
        id: requestGroups[i].id,
        name: requestGroups[i].borrower_id,
        items: <ArrowIcon items={requestGroups[i]?.requestItems} />,
        status: "Approved",
      });
    }
    setRows(newRows);
  }, []);

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

  // const rowsToRender = rows.map((row) => ({
  //   ...row,
  //   role: getRoleComponent(row[''].toString()),
  //   status: getStatusComponent(row[''].toString()),
  // }));

  return <GenericTable columns={columns} rows={rows} />;
}
