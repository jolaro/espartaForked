import { Typography, Chip, Box } from "@mui/material";
import { reservationStyles } from "styles/mui/reservationStyles";
import EmailIcon from "@mui/icons-material/Email";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import { useIsMobile } from "hooks/useIsMobile";

interface SoldierDetailsProps {
  name?: string;
  id?: string;
  role?: string;
  email?: string;
}

export function SoldierDetails(props: SoldierDetailsProps) {
  const isMobile = useIsMobile();

  return (
    <Box sx={reservationStyles.detailsBox}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Typography variant={isMobile ? "h5" : "h3"} color="primary">
          {props.name}
        </Typography>
      </Box>
      <Box sx={reservationStyles.chipContainer}>
        {props.id && <Chip icon={<Grid3x3Icon />} label={props.id} />}
        {props.email && <Chip icon={<EmailIcon />} label={props.email} />}
      </Box>
      <Typography>{props.role !== undefined && props.role !== "" ? "Role: " + props.role : ""}</Typography>
    </Box>
  );
}
