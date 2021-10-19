import { Button } from "@mui/material";
import useTranslate from "../../hooks/useTranslate";

export function RejectButton() {
  const t = useTranslate();
  return <Button variant="contained" color="error">{t("reject")}</Button>;
}