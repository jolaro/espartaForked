import { createState, Downgraded, useHookstate } from "@hookstate/core";
import { DatePicker } from "@mui/lab";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Alert } from "@mui/material";
import useTranslate from "hooks/useTranslate";
import React from "react";
import { soldierAvailableItemsStyles } from "styles/mui/soldierAvailableItemsStyles";

interface SoldierRequestDialogProps {
  itemId: string;
}

export const isSoldierRequestDialogOpen = createState(false);

const SoldierRequestDialog: React.FC<SoldierRequestDialogProps> = ({ itemId }) => {
  const t = useTranslate();
  const isOpen = useHookstate(isSoldierRequestDialogOpen);
  const fromDate = useHookstate(null).attach(Downgraded);
  const untilDate = useHookstate(null).attach(Downgraded);

  return (
    <Dialog open={isOpen.get()} onClose={() => isOpen.set(false)}>
      <DialogTitle>
        {t("soldierActions.requestDialogTitle")} {itemId}
      </DialogTitle>
      <DialogContent>
        <Alert severity="info">{t("soldierActions.requestDialogInfoAlert")}</Alert>
        <DatePicker
          label={t("soldierActions.requestDialogFromDate")}
          value={fromDate.get()}
          onChange={(newValue) => {
            fromDate.set(newValue);
          }}
          renderInput={(params) => <TextField {...params} sx={soldierAvailableItemsStyles.requestDialogTextField} />}
        />
        <DatePicker
          label={t("soldierActions.requestDialogUntilDate")}
          value={untilDate.get()}
          onChange={(newValue) => {
            untilDate.set(newValue);
          }}
          renderInput={(params) => <TextField {...params} sx={soldierAvailableItemsStyles.requestDialogTextField} />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => isOpen.set(false)} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={() => isOpen.set(false)} color="primary" disableElevation>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SoldierRequestDialog;
