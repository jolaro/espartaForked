import { Box, Paper } from "@mui/material";
import { SoldierDetails } from "components/atoms/SoldierDetails";
import { SoldierImage } from "components/atoms/SoldierImage";
import BodyLayout from "layouts/BodyLayout";
import { reservationStyles } from "styles/mui/reservationStyles";

interface ReservationProps {}

const Reservation: React.FC<ReservationProps> = () => {
  return (
    <BodyLayout>
      <Box sx={reservationStyles.detailsMainBox}>
        <SoldierImage alt="Soldier placeholder" imageUrl="http://cpgw.org.uk/wp-content/uploads/soldier-placeholder.png"/>
        <SoldierDetails name="Soldier Name" id="12234" role="Troop" />
      </Box>
    </BodyLayout>
  );
};

export default Reservation;
