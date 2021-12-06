import React from "react";
import { RequestGroupResponse } from "utils/api_service/endpoints.config";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Chip } from "@mui/material";
import useTranslate from "hooks/useTranslate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface StatusChipProps {
  requestGroup: RequestGroupResponse;
}

const StatusChip: React.FC<StatusChipProps> = ({ requestGroup }) => {
  const t = useTranslate();

  if (!requestGroup.manager_id) {
    return <Chip label={t("status.waitingApproval")} icon={<HourglassTopIcon />} />;
  }

  if (requestGroup.approved) {
    return <Chip label={t("approved")} icon={<CheckCircleIcon />} color="success" />;
  } else {
    return <Chip label={t("rejected")} icon={<CancelIcon />} color="error" />;
  }

  // return <Chip label={t("status.overdue")} icon={<AccessAlarmsIcon />} color="error" />;
  // return <Chip label={t("status.inUse")} icon={<ManageAccountsIcon />} color="info" />;
  // return <Chip label={t("status.returned")} icon={<SportsScoreIcon />} color="success" />;

  // return <Chip label="Unknown" />;
};

export default StatusChip;
