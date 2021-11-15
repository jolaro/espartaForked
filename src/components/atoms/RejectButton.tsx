import { Button } from "@mui/material";
import useTranslate from "../../hooks/useTranslate";

export function RejectButton(props: any) {
  const t = useTranslate();
  return (
    <Button onClick={props.onHandleClick} variant="outlined" color="error" size="small">
      {t("reject")}
    </Button>
  );
}
