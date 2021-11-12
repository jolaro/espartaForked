import { Box, Button, Chip } from "@mui/material";
import { SoldierDetails } from "components/atoms/SoldierDetails";
import { SoldierImage } from "components/atoms/SoldierImage";
import GenericTable, { ColumnConfig, GenericTableRow } from "components/molecules/GenericTable";
import BodyLayout from "layouts/BodyLayout";
import { reservationStyles } from "styles/mui/reservationStyles";
import AddIcon from "@mui/icons-material/Add";
import { ItemTableHeader } from "components/molecules/ItemTableHeader";

interface ReservationProps {}

const Reservation: React.FC<ReservationProps> = () => {
  const columns: ColumnConfig[] = [
    {
      title: "ItemId",
      id: "itemId",
      muiProps: {
        width: "60px",
      },
    },
    {
      title: "Item name",
      id: "name",
      muiProps: {
        align: "left",
        width: "60%",
      },
    },
    {
      title: "Category",
      id: "category",
      muiProps: {
        align: "center",
      },
    },
    {
      title: "QR/Barcode",
      id: "qr_barcode",
      muiProps: {
        align: "center",
        width: "5%",
      },
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

  const addItem = () => {};

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
        <ItemTableHeader onHandleClick={addItem} />
        <GenericTable columns={columns} rows={rows} />
      </Box>
    </BodyLayout>
  );
};

export default Reservation;
