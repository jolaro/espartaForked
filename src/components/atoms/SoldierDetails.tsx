import { Box } from "@mui/system";
import { reservationStyles } from "styles/mui/reservationStyles";

export function SoldierDetails() {
  return (
  <Box sx={reservationStyles.detailsBox}>
      <h1>Soldier Name</h1>
      <h5>Soldier Id</h5>
      <h5>Soldier Role</h5>
  </Box>
  );
}
