import { SoldierDetails } from "components/atoms/SoldierDetails";
import BodyLayout from "layouts/BodyLayout";

interface ReservationProps {}

const Reservation: React.FC<ReservationProps> = () => {
  return <BodyLayout>
    <SoldierDetails/>
  </BodyLayout>;
};

export default Reservation;
