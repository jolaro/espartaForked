import { Stack } from "@mui/material";
import { RejectButton } from "../atoms/RejectButton";
import { ApproveButton } from "../atoms/ApproveButton";
import useTranslate from "../../hooks/useTranslate";

export function StackRequestButtons(props: any) {
  const t = useTranslate();
  console.log(props.request.status)
  return (
    <Stack direction="row" spacing={1}>
      {(props.request.status == t("pending")) && <><RejectButton /><ApproveButton /></>}
    </Stack>
  );
}