import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { reservationStyles } from "styles/mui/reservationStyles";
import { soldierImg } from "styles/mui/reservationStyles";

interface SoldierImageProps {
  imageUrl: string;
  alt: string;
}

export function SoldierImage(props: SoldierImageProps) {
  return (
    <Box sx={reservationStyles.detailsBoxElement}>
      <Paper elevation={10}>
        <img style={soldierImg} alt={props.alt} src={props.imageUrl} />
      </Paper>
    </Box>
  );
}
