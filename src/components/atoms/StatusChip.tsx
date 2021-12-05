import React from "react";
import { ItemTypeResponse } from "utils/api_service/endpoints.config";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Chip } from "@mui/material";

interface StatusChipProps {
  item: ItemTypeResponse;
}

const StatusChip: React.FC<StatusChipProps> = ({ item }) => {
  const dateReturned = item.date_returned ? new Date(item.date_returned) : null;
  const dateBorrowed = item.date_borrowed ? new Date(item.date_borrowed) : null;
  const dateDue = new Date(item.date_due);
  const dateNow = new Date();

  if (dateDue < dateNow && !dateReturned) {
    return <Chip label="Overdue" icon={<AccessAlarmsIcon />} color="error" />;
  }

  if (dateDue > dateNow && !dateReturned) {
    return <Chip label="In use" icon={<ManageAccountsIcon />} color="info" />;
  }

  if (dateReturned) {
    return <Chip label="Returned" icon={<SportsScoreIcon />} color="success" />;
  }

  if (!dateBorrowed) {
    return <Chip label="Waiting approval" icon={<HourglassTopIcon />} />;
  }

  return <Chip label="Unknown" />;
};

export default StatusChip;
