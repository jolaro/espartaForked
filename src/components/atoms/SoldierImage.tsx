import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { reservationStyles } from "styles/mui/reservationStyles";

interface SoldierImageProps {
  imageUrl: string,
  alt: string,
}

export function SoldierImage(props: SoldierImageProps) {
  return (
    <Box sx={reservationStyles.detailsBoxItem}>
      <Paper elevation={10}>
        <img alt={props.alt} src={props.imageUrl} />
      </Paper>
    </Box>
  );
}
