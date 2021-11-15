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
import { ItemResponse } from "utils/api_service/endpoints.config";
import { GenericTableRow } from "components/molecules/GenericTable";
import ApiService from "utils/api_service/api_service";
import { useCallback, useEffect } from "react";
import { Global } from "@emotion/react";
import GlobalState from "state/GlobalState";
interface ReservationProps {}

const weaponColumns: ColumnConfig[] = [
  {
    id: "itemId",
    title: "Id",
    muiProps: {
      width: "60px",
    },
  },
  {
    id: "name",
    title: "Weapon",
  },
  {
    id: "category",
    title: "Category",
  },
  {
    id: "qr_barcode",
    title: "QR/Barcode",
  },
];

const Reservation: React.FC<ReservationProps> = () => {
  const genericTableRows: GenericTableRow[] = [];
  const u: User = {
    id: -1,
    name: "",
    email: "",
    access_level: "-1",
    email_verified_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const [soldier, setSoldier] = React.useState(u);
  const [rows, setRows] = React.useState(genericTableRows);

  const addSoldier = (soldier: User) => {
    handleClickCloseSoldiersDialog();
    setSoldier(soldier);
  };

  const addWeapons = (weapons: ItemResponse[]) => {
    handleClickCloseWeaponsDialog();
    const newRows: GenericTableRow[] = [];
    if (weapons != null) {
      for (let i = 0; i < weapons.length; i++) {
        console.log(weapons[i]);
        newRows.push({
          itemId: weapons[i].id.toString(),
          name: <Typography>{weapons[i].item_type?.name}</Typography>,
          category: <Typography>{weapons[i].item_type?.category}</Typography>,
          qr_barcode: weapons[i].id.toString(),
        });
      }
    }
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

  const createReservation = useCallback(async () => {
    console.log("Soldier id " + soldier.id);
    console.log("User id " + GlobalState.user?.id);
    if (GlobalState.user != null && soldier.id.toString() !== "-1") {
      const responseRequestGroup = await ApiService.post("/api/requestgroup", {
        borrower_id: soldier.id.toString(),
        manager_id: GlobalState.user.id.toString(),
      });
      console.log(responseRequestGroup.data);
      console.log("Print");

      // for (let i = 0; i < users.length; i++) {
      //   users[i].role = getRole(users[i].access_level);
      // }
      // setSoldiers(users);
      // setFoundSoldiers(users);
    }
  }, []);

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
        <SoldierDetails name={soldier.name} id={soldier.id.toString()} role={soldier?.role} />
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
          onHandleClick={createReservation}
        />
      </Box>
    </BodyLayout>
  );
};

export default Reservation;
