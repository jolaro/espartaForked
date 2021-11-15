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
import GlobalState from "state/GlobalState";
import { User } from "interfaces/User";

interface ReservationProps {}

const columns: ColumnConfig[] = [
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
  const [rows, setRows] = React.useState(genericTableRows);

  const addSoldier = (users: User[]) => {
    handleClickClose();
    const newRows: GenericTableRow[] = [];
    if (users != null) {
      for (let i = 0; i < users.length; i++) {
        console.log(users[i]);
        newRows.push({
          itemId: users[i].id.toString(),
          name: users[i].name,
          category: users[i].toString(),
          qr_barcode: users[i].id.toString(),
        });
      }
    }
    setRows(newRows);
  };

  const addWeapons = (weapons: Weapon[]) => {
    handleClickClose();
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
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
        <IconButton icon={<AddIcon />} text="Add Soldier" onHandleClick={addSoldier} />
      </Box>
      <Box sx={reservationStyles.detailsMainBox}>
        <SoldierImage
          alt="Soldier placeholder"
          imageUrl="http://cpgw.org.uk/wp-content/uploads/soldier-placeholder.png"
        />
        <SoldierDetails name="Soldier Name" id="12234" role="Troop" />
      </Box>
      <Box>
        <h2>QR/Barcodes</h2>
        <Button variant="contained">Link QR/Barcode</Button>
      </Box>
      <Box sx={reservationStyles.itemsTableBox}>
        <ItemTableHeader onHandleClick={handleClickOpen} />
        <GenericTable columns={columns} rows={rows} />
        <WeaponFormDialog handleClickClose={handleClickClose} open={open} handleAddWeapons={addWeapons} />
      </Box>
    </BodyLayout>
  );
};

export default Reservation;
