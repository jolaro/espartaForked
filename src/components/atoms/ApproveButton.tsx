import { Button } from "@mui/material";
import useTranslate from "../../hooks/useTranslate";

export function ApproveButton(props: any) {
  const t = useTranslate();
  return (
    <Button onClick={props.onHandleClick} variant="outlined" color="success" disableElevation size="small">
      {t("approve")}
    </Button>
  );
}
