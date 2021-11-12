import { Box } from "@mui/system";
import { reservationStyles } from "styles/mui/reservationStyles";

interface SoldierDetailsProps {
  name: string;
  id: string;
  role: string;
}

export function SoldierDetails(props: SoldierDetailsProps) {
  return (
    <Box sx={reservationStyles.detailsBox}>
      <h1>{props.name}</h1>
      <h5>{props.id}</h5>
      <h5>{props.role}</h5>
    </Box>
  );
}
