import { Box, Button } from "@mui/material";
import { SoldierDetails } from "components/atoms/SoldierDetails";
import { SoldierImage } from "components/atoms/SoldierImage";
import GenericTable, { ColumnConfig, GenericTableRow } from "components/molecules/GenericTable";
import BodyLayout from "layouts/BodyLayout";
import { reservationStyles } from "styles/mui/reservationStyles";
import AddIcon from "@mui/icons-material/Add";
import { ItemTableHeader } from "components/molecules/ItemTableHeader";
import * as React from "react";
import WeaponFormDialog from "components/molecules/WeaponDialog";
import { Weapon } from "components/molecules/WeaponsTableBody";
import { IconButton } from "components/atoms/IconButton";
import { User } from "interfaces/User";
import SoldierFormDialog from "components/molecules/SoldierFormDialog";

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

  const getRole = (accessLevel: string) => {
    if (accessLevel === "0") {
      return "Troop";
    } else if (accessLevel === "1") {
      return "Commander";
    } else if (accessLevel === "2") {
      return "Manager";
    } else {
      return "";
    }
  };

  const addWeapons = (weapons: Weapon[]) => {
    handleClickCloseWeaponsDialog();
    const newRows: GenericTableRow[] = [];
    if (weapons != null) {
      for (let i = 0; i < weapons.length; i++) {
        console.log(weapons[i]);
        newRows.push({
          itemId: weapons[i].id.toString(),
          name: weapons[i].name,
          category: weapons[i].category_id.toString(),
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
        <SoldierDetails name={soldier.name} id={soldier.id.toString()} role={getRole(soldier.access_level)} />
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
    </BodyLayout>
  );
};

export default Reservation;
