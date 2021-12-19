import { useHookstate } from "@hookstate/core";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert } from "@mui/material";
import LocationSelect from "components/atoms/LocationSelect";
import useTranslate from "hooks/useTranslate";
import { useSnackbar } from "notistack";
import React from "react";
import ApiService from "utils/api_service/api_service";
import { RequestGroupResponse } from "utils/api_service/endpoints.config";

interface ReturnItemDialogProps {
  id: string;
  onReturn: () => void;
}

const ReturnItemDialog: React.FC<ReturnItemDialogProps> = ({ id, onReturn }) => {
  const t = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const depot = useHookstate<string>("");
  const isOpen = useHookstate(false);
  const loading = useHookstate(false);

  const closeModal = () => isOpen.set(false);
  const openModal = () => isOpen.set(true);

  const submit = async () => {
    loading.set(true);
    const requestGroup = await ApiService.unsafeGet<RequestGroupResponse>("/api/requestgroup/" + id);
    const promises = requestGroup.data.request_items.flatMap((item) => {
      const requestItemPromise = ApiService.put("/api/requestitem/" + item.id, {
        date_returned: new Date(),
      });

      const itemPromise = ApiService.put("/api/items/" + item.item_id, {
        depot: depot.get(),
      });

      return [requestItemPromise, itemPromise];
    });

    await Promise.all(promises);
    loading.set(false);
    onReturn();
    enqueueSnackbar(t("returnItem.successSnackbar"), { variant: "success" });
    closeModal();
  };

  return (
    <>
      <Button onClick={openModal}>{t("soldierActions.markReturned")}</Button>
      <Dialog open={isOpen.get()} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogTitle>{t("returnItem.title")}</DialogTitle>
        <DialogContent>
          <Alert
            severity="info"
            sx={{
              mb: 2,
            }}
          >
            {t("returnItem.alertText")}
          </Alert>
          <LocationSelect onSelect={depot.set} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="inherit">
            {t("soldierActions.cancelButton")}
          </Button>
          <LoadingButton
            loading={loading.get()}
            variant="contained"
            onClick={submit}
            color="primary"
            disableElevation
            disabled={loading.get()}
          >
            {t("soldierActions.submit")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReturnItemDialog;
