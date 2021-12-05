import { Stack } from "@mui/material";
import { RejectButton } from "../atoms/RejectButton";
import { ApproveButton } from "../atoms/ApproveButton";
import useTranslate from "../../hooks/useTranslate";
import { Request } from "./RequestsTableBody";

import React from "react";

interface StackRequestButtonsProps {
  request: Request;
  onHandleClick: (request: Request) => void;
}

const StackRequestButtons: React.FC<StackRequestButtonsProps> = (props) => {
  const t = useTranslate();

  const newRequest = {
    id: props.request.id,
    name: props.request.name,
    role: props.request.role,
    items: props.request.items,
    status: props.request.status,
  };

  const handleRejectClick = () => {
    newRequest.status = t("rejected");
    props.onHandleClick(newRequest);
  };

  const handleApproveClick = () => {
    newRequest.status = t("approved");
    props.onHandleClick(newRequest);
  };

  return (
    <Stack direction="row-reverse" spacing={1}>
        <>
          <RejectButton onHandleClick={handleRejectClick} />
          <ApproveButton onHandleClick={handleApproveClick} />
        </>
    </Stack>
  );
};

export default StackRequestButtons;
