import { Box, Button, Typography } from "@mui/material";
import { SoldierDetails } from "components/atoms/SoldierDetails";
import { SoldierImage } from "components/atoms/SoldierImage";
import GenericTable, { ColumnConfig } from "components/molecules/GenericTable";
import BodyLayout from "layouts/BodyLayout";
import { reservationStyles } from "styles/mui/reservationStyles";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import { ItemTableHeader } from "components/molecules/ItemTableHeader";
import * as React from "react";
import WeaponFormDialog from "components/molecules/WeaponDialog";
import { IconButton } from "components/atoms/IconButton";
import { User } from "interfaces/User";
import SoldierFormDialog from "components/molecules/SoldierFormDialog";
import { ItemResponse, RequestGroupResponse, RequestItemData } from "utils/api_service/endpoints.config";
import { GenericTableRow } from "components/molecules/GenericTable";
import ApiService from "utils/api_service/api_service";
import { useCallback } from "react";
import GlobalState from "state/GlobalState";

interface ReservationProps {}

const weaponColumns: ColumnConfig[] = [
  {
    id: "itemId",
    title: "table.header.id",
    muiProps: {
      width: "60px",
    },
  },
  {
    id: "name",
    title: "table.header.weapon",
  },
  {
    id: "category",
    title: "table.header.category",
  },
  {
    id: "qr_barcode",
    title: "table.header.qrbarcode",
  },
];

const Reservation: React.FC<ReservationProps> = () => {
  const [soldier, setSoldier] = React.useState<User>();
  const [items, setItems1] = React.useState<ItemResponse[]>([]);
  const [rows, setRows] = React.useState<GenericTableRow[]>([]);

  const addSoldier = (soldier1: User) => {
    handleClickCloseSoldiersDialog();
    setSoldier(soldier1);
  };

  const addWeapons = (weapons: ItemResponse[]) => {
    handleClickCloseWeaponsDialog();
    const newWeapons: ItemResponse[] = [...weapons];
    const newRows: GenericTableRow[] = [];
    if (weapons != null) {
      for (let i = 0; i < weapons.length; i++) {
        newRows.push({
          itemId: weapons[i].id.toString(),
          name: <Typography>{weapons[i].item_type?.name}</Typography>,
          category: <Typography>{weapons[i].item_type?.category}</Typography>,
          qr_barcode: weapons[i].id.toString(),
        });
      }
    }
    setItems1(newWeapons);
    setRows(newRows);
  };

  const [showWeapons, setShowWeapons] = React.useState(false);

  const handleClickOpenWeaponsDialog = () => {
    setShowWeapons(true);
  };

  const handleClickCloseWeaponsDialog = () => {
    setShowWeapons(false);
  };

  const [showSoldiers, setShowSoldiers] = React.useState(false);

  const handleClickOpenSoldiersDialog = () => {
    setShowSoldiers(true);
  };

  const handleClickCloseSoldiersDialog = () => {
    setShowSoldiers(false);
  };

  const createReservation = useCallback(async (it: ItemResponse[], soldier?: User) => {
    if (GlobalState.user != null && soldier !== undefined) {
      let requestGroupResponse: RequestGroupResponse;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      };
      fetch(
        `http://127.0.0.1:8000/api/requestgroup?borrower_id=${soldier.id.toString()}&manager_id=${GlobalState.user.id.toString()}`,
        requestOptions,
      )
        .then((response) => response.json())
        .then((data) => {
          requestGroupResponse = data;
          const requestItems: RequestItemData[] = [];

          for (let i = 0; i < it.length; i++) {
            requestItems.push({
              item_id: it[i].id,
              item_type_id: Number(it[i].item_type_id),
              request_group_id: Number(requestGroupResponse.id),
              approved: 1,
              date_due: new Date().toString(),
              date_borrowed: new Date().toString(),
              date_returned: new Date().toString(),
            });
          }
          responseRequestItems(requestItems);
        });
    }
  }, []);

  const responseRequestItems = async (requestItems: RequestItemData[]) => {
    await ApiService.post("/api/requestitem", requestItems);
  };

  return (
    <BodyLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
        }}
      >
        <IconButton icon={<AddIcon />} text="Add Soldier" onHandleClick={handleClickOpenSoldiersDialog} />
      </Box>
      <SoldierFormDialog
        handleClickClose={handleClickCloseSoldiersDialog}
        open={showSoldiers}
        handleAddSoldiers={addSoldier}
      />
      <Box sx={reservationStyles.detailsMainBox}>
        <SoldierImage
          alt="Soldier placeholder"
          imageUrl="http://cpgw.org.uk/wp-content/uploads/soldier-placeholder.png"
        />
        <SoldierDetails name={soldier?.name} id={soldier?.id.toString()} role={soldier?.role} />
      </Box>
      <Box>
        <h2>QR/Barcodes</h2>
        <Button variant="contained">Link QR/Barcode</Button>
      </Box>
      <Box sx={reservationStyles.itemsTableBox}>
        <ItemTableHeader onHandleClick={handleClickOpenWeaponsDialog} />
        <GenericTable columns={weaponColumns} rows={rows} />
        <WeaponFormDialog
          handleClickClose={handleClickCloseWeaponsDialog}
          open={showWeapons}
          handleAddWeapons={addWeapons}
        />
      </Box>
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
        }}
      >
        <IconButton
          backgroundColor="#4caf50"
          icon={<CheckIcon />}
          text="Create reservation"
          onHandleClick={() => {
            createReservation(items, soldier);
          }}
        />
      </Box>
    </BodyLayout>
  );
};

export default Reservation;
