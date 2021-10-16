import { Stack } from "@mui/material";
import { RejectButton } from "../atoms/RejectButton";
import { ApproveButton } from "../atoms/ApproveButton";

function StackRequestButtons() {
  return (
    <Stack>
      <RejectButton/>
      <ApproveButton/>
    </Stack>
  );
}