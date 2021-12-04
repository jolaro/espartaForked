import { createState, Downgraded, useHookstate } from "@hookstate/core";
import { DatePicker, LoadingButton } from "@mui/lab";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Alert } from "@mui/material";
import useTranslate from "hooks/useTranslate";
import { useSnackbar } from "notistack";
import React from "react";
import GlobalState from "state/GlobalState";
import { soldierAvailableItemsStyles } from "styles/mui/soldierAvailableItemsStyles";
import ApiService from "utils/api_service/api_service";
import { ItemTypeResponse } from "utils/api_service/endpoints.config";

interface SoldierRequestDialogProps {
  items: ItemTypeResponse[];
  onSuccess?: () => void;
}

export const isSoldierRequestDialogOpen = createState(false);

const SoldierRequestDialog: React.FC<SoldierRequestDialogProps> = ({ items, onSuccess }) => {
  const t = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const isSubmitting = useHookstate(false);
  const isOpen = useHookstate(isSoldierRequestDialogOpen);
  const fromDate = useHookstate(null).attach(Downgraded);
  const untilDate = useHookstate(null).attach(Downgraded);

  const closeModal = () => {
    isOpen.set(false);
  };

  const handleSubmit = async () => {
    isSubmitting.set(true);
    const { data: requestGroup } = await ApiService.post("/api/requestgroup", {
      borrower_id: GlobalState.user!.id,
      // TODO: Make this null when backend has made it nullable
      manager_id: 1,
    });

    const requestItemsData = items.map((item) => ({
      item_id: item.id,
      request_group_id: Number(requestGroup.id),
      approved: 0,
      due_date: untilDate.get() || undefined,
    }));
    const { data: reqestItem } = await ApiService.post("/api/requestitem", requestItemsData);

    //TODO: Probably check if request succesfull?

    enqueueSnackbar(t("soldierActions.requestSubmittedSnackbar"), { variant: "success" });
    isSubmitting.set(false);
    closeModal();
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={isOpen.get()} onClose={closeModal}>
      <DialogTitle>
        {t("soldierActions.requestDialogTitle")} {items.map((item) => item.name).join(", ")}
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
        <Button onClick={closeModal} color="inherit">
          {t("soldierActions.cancelButton")}
        </Button>
        <LoadingButton
          loading={isSubmitting.get()}
          variant="contained"
          onClick={handleSubmit}
          color="primary"
          disableElevation
        >
          {t("soldierActions.submitButton")}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default SoldierRequestDialog;
