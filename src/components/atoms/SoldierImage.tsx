import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { reservationStyles } from "styles/mui/reservationStyles";
import { getStringAvatar } from "utils/get_string_avatar.util";

interface SoldierImageProps {
  name: string;
}

export function SoldierImage(props: SoldierImageProps) {
  return (
    <Box sx={reservationStyles.detailsBoxElement}>
      <Avatar {...getStringAvatar(props.name)} sx={{ width: 64, height: 64 }} />
    </Box>
  );
}
