import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import useTranslate from "hooks/useTranslate";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import GlobalState from "state/GlobalState";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";

const SignOutButton: React.FC = () => {
  const t = useTranslate();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    GlobalState.signOut();
    enqueueSnackbar(t("notification.signedOut"));
    history.push("/sign-in");
  };

  return (
    <Tooltip title={t("signIn.signOut")}>
      <IconButton aria-label="sign-out" color="error" onClick={handleLogout}>
        <ExitToAppOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SignOutButton;
