import { Stack } from "@mui/material";
import { RejectButton } from "../atoms/RejectButton";
import { ApproveButton } from "../atoms/ApproveButton";

export function StackRequestButtons() {
  return (
    <Stack direction='row' spacing={1}>
      <RejectButton />
      <ApproveButton />
    </Stack>
  );
}