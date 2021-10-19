import { Button } from "@mui/material";
import useTranslate from "../../hooks/useTranslate";

export function ApproveButton() {
  const t = useTranslate();
  return <Button variant="contained" color="success">{t("approve")}</Button>;
}