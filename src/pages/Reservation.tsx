import { Box, Button, Chip } from "@mui/material";
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

const rows: GenericTableRow[] = [
  {
    name: "AK-47",
    category: <Chip label="Heavy" />,
    status: <Chip label="Returned" />,
  },
  {
    name: "M4a1-s",
    category: <Chip label="Light" />,
    status: <Chip color="error" label="In use" />,
  },
];

const Reservation: React.FC<ReservationProps> = () => {
  const genericTableRows: GenericTableRow[] = [];
  const [rows, setRows] = React.useState(genericTableRows);

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
