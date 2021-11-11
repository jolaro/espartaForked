import useTranslate from "../../hooks/useTranslate";
import { Button } from "@mui/material";

export function AddButton(props: any) {
  const t = useTranslate();
  return <Button onClick={props.onHandleClick} variant="contained"
                 style={{ backgroundColor: "#c4bcbc", color: "white", width: 100 }}>{t("add")}</Button>;
}
