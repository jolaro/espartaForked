import { Box } from "@mui/material";
import { IconButton } from "components/atoms/IconButton";
import { reservationStyles } from "styles/mui/reservationStyles";
import AddIcon from "@mui/icons-material/Add";

interface ItemTableHeaderProps {
  onHandleClick: any;
}

export function ItemTableHeader(props: ItemTableHeaderProps) {
  return (
    <Box sx={reservationStyles.itemsTableHeader}>
      <Box sx={reservationStyles.itemsTableHeaderName}>
        <h4>Items</h4>
      </Box>
      <Box sx={reservationStyles.itemsTableHeaderButton}>
        <IconButton icon={<AddIcon />} text="Add" onHandleClick={props.onHandleClick} />
      </Box>
    </Box>
  );
}
