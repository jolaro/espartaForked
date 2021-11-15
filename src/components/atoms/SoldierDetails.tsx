import { Box } from "@mui/system";
import { reservationStyles } from "styles/mui/reservationStyles";

interface SoldierDetailsProps {
  name: string;
  id: string;
  role?: string;
}

export function SoldierDetails(props: SoldierDetailsProps) {
  return (
    <Box sx={reservationStyles.detailsBox}>
      <h1>{props.name}</h1>
      <h3>{props.id === "-1" ? "" : "Id: " + props.id}</h3>
      <h3>{props.role !== undefined && props.role !== "" ? "Role: " + props.role : ""}</h3>
    </Box>
  );
}
