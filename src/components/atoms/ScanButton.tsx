import { Button, ButtonProps } from "@mui/material";
import useTranslate from "hooks/useTranslate";
import React from "react";
import QrCode2Icon from "@mui/icons-material/QrCode2";

const ScanButton: React.FC<ButtonProps> = (props) => {
  const t = useTranslate();

  return (
    <Button variant="outlined" startIcon={<QrCode2Icon />} {...props}>
      {t("reservation.scanButton")}
    </Button>
  );
};

export default ScanButton;
