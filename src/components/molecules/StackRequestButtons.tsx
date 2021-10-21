import { Stack } from "@mui/material";
import { RejectButton } from "../atoms/RejectButton";
import { ApproveButton } from "../atoms/ApproveButton";
import useTranslate from "../../hooks/useTranslate";

export function StackRequestButtons(props: any) {
  const t = useTranslate();
  const newRequest = {
    id: props.request.id,
    name: props.request.name,
    role: props.request.role,
    items: props.request.items,
    status: props.request.status,
  };

  const handleRejectClick = () => {
    newRequest.status = t("reject");
    props.onHandleClick(newRequest);
  };

  const handleApproveClick = () => {
    newRequest.status = t("approve");
    props.onHandleClick(newRequest);
  };

  return (
    <Stack direction="row" spacing={1}>
      {(props.request.status === t("pending") || props.request.status === "Pending") && (
        <>
          <RejectButton onHandleClick={handleRejectClick} />
          <ApproveButton onHandleClick={handleApproveClick} />
        </>
      )}
    </Stack>
  );
}
