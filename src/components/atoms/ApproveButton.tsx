import { Button } from "@mui/material";
import useTranslate from "../../hooks/useTranslate";

export function ApproveButton(props: any) {
  const t = useTranslate();
  return <Button onClick={props.onHandleClick} variant="contained"
                 style={{ backgroundColor: "#4caf50", color: "white", width: 100 }}>{t("approve")}</Button>;
} 