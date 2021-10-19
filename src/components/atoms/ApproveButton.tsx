import { Button } from "@mui/material";
import useTranslate from "../../hooks/useTranslate";

export function ApproveButton() {
  const t = useTranslate();
  return <Button variant="contained" style={{ backgroundColor: "#4caf50", color: "white", width: 100 }}>{t("approve")}</Button>;
} 