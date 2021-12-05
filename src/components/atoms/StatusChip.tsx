import React from "react";
import { ItemTypeResponse } from "utils/api_service/endpoints.config";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Chip } from "@mui/material";
import useTranslate from "hooks/useTranslate";

interface StatusChipProps {
  item: ItemTypeResponse;
}

const StatusChip: React.FC<StatusChipProps> = ({ item }) => {
  const t = useTranslate();

  const dateReturned = item.date_returned ? new Date(item.date_returned) : null;
  const dateBorrowed = item.date_borrowed ? new Date(item.date_borrowed) : null;
  const dateDue = new Date(item.date_due);
  const dateNow = new Date();

  if (dateDue < dateNow && !dateReturned) {
    return <Chip label={t("status.overdue")} icon={<AccessAlarmsIcon />} color="error" />;
  }

  if (dateDue > dateNow && !dateReturned) {
    return <Chip label={t("status.inUse")} icon={<ManageAccountsIcon />} color="info" />;
  }

  if (dateReturned) {
    return <Chip label={t("status.returned")} icon={<SportsScoreIcon />} color="success" />;
  }

  if (!dateBorrowed) {
    return <Chip label={t("status.waitingApproval")} icon={<HourglassTopIcon />} />;
  }

  return <Chip label="Unknown" />;
};

export default StatusChip;
