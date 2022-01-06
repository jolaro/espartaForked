import { useHookstate } from "@hookstate/core";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import LocationSelect from "components/atoms/LocationSelect";
import ScanButton from "components/atoms/ScanButton";
import useTranslate from "hooks/useTranslate";
import { Category } from "interfaces/Category";
import { useSnackbar } from "notistack";
import React, { useRef } from "react";
import { MutableRefObject } from "react";
import { addItemDialogStyles } from "styles/mui/addItemDialogStyles";
import { commonStyles } from "styles/mui/commonStyles";
import ApiService from "utils/api_service/api_service";
import { ItemTypeResponse } from "utils/api_service/endpoints.config";
import { getPureValue } from "utils/pure_value";

interface SerialInputBoxProps {
  index: number;
  label: string;
  handleSerialInputOnChange: (index: number, value: string) => void;
}

function SerialInputBoxWithQrButton(props: SerialInputBoxProps) {
  const useFocus = (): [any, () => void] => {
    const htmlElRef: MutableRefObject<any> = useRef(null);
    const setFocus = (): void => {
      htmlElRef?.current?.focus?.();
    };

    return [htmlElRef, setFocus];
  };

  const [inputRef, setInputRef] = useFocus();

  return (
    <>
      <Box sx={addItemDialogStyles.row} key={props.index}>
        <TextField
          inputRef={inputRef}
          label={props.label}
          onChange={(e) => props.handleSerialInputOnChange(props.index, e.target.value)}
        />
        <ScanButton onClick={setInputRef} />
      </Box>
    </>
  );
}

interface AddItemDialogProps {
  onSuccess?: (data: ItemTypeResponse) => void;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({ onSuccess }) => {
  const t = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const loading = useHookstate(false);
  const step = useHookstate(0);
  const isOpen = useHookstate(false);
  const uniqueItems = useHookstate<string[]>([]);

  const name = useHookstate("");
  const quantity = useHookstate(1);
  const category = useHookstate("0");
  const location = useHookstate("0");

  const submit = async () => {
    loading.set(true);
    const { data } = await ApiService.post("/api/itemtypes", {
      name: getPureValue(name),
      weight_category: Number(getPureValue(category)),
      desired_amount: Number(getPureValue(quantity)),
      image: "123", //TODO: Remove when made optional on backend
      price: 12, //TODO: Remove when made optional on backend
    });
    loading.set(false);
    closeModal();
    enqueueSnackbar(t("addItem.successSnackbar"), { variant: "success" });
    if (onSuccess) onSuccess(data);
  };

  const closeModal = () => {
    isOpen.set(false);
  };
  const openModal = () => {
    isOpen.set(true);
  };

  const categoryOptions = [
    {
      label: t("category.light"),
      value: Category.LIGHT.toString(),
    },
    {
      label: t("category.medium"),
      value: Category.MEDIUM.toString(),
    },
    {
      label: t("category.heavy"),
      value: Category.HEAVY.toString(),
    },
  ];

  const goToNextStep = () => {
    if (step.get() === 0) {
      step.set(1);
      uniqueItems.set(Array.from({ length: quantity.get() }).fill("") as string[]);
    } else {
      submit();
    }
  };

  const steps = [t("addItem.step0"), t("addItem.step1")];

  const step0 = (
    <>
      <Box sx={addItemDialogStyles.row}>
        <TextField
          label={t("addItem.nameLabel")}
          onChange={(e) => name.set(e.target.value)}
          error={name.get().length === 0}
        />
      </Box>
      <Box sx={addItemDialogStyles.row}>
        <TextField
          error={quantity.get() < 1}
          label={t("addItem.quantityLabel")}
          type="number"
          onChange={(e) => quantity.set(Number(e.target.value))}
          defaultValue="1"
        />
        <TextField
          label={t("addItem.categoryLabel")}
          select
          defaultValue={categoryOptions[0].value}
          onChange={(e) => category.set(e.target.value)}
        >
          {categoryOptions.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={addItemDialogStyles.row}>
        <LocationSelect onSelect={location.set} />
      </Box>
    </>
  );

  const handleSerialInputOnChange = (index: number, value: string) => {
    uniqueItems[index].set(value);
  };

  const step1 = (
    <>
      {uniqueItems.get().map((_, i) => (
        <SerialInputBoxWithQrButton
          index={i}
          label={`${t("addItem.serialCodeLabel")} ${i}`}
          handleSerialInputOnChange={handleSerialInputOnChange}
        />
      ))}
    </>
  );

  return (
    <>
      <Box sx={commonStyles.buttonContainer}>
        <Button variant="contained" onClick={openModal} disableElevation>
          {t("addItem.addItemsButton")}
        </Button>
      </Box>
      <Dialog open={isOpen.get()} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogTitle>{t("addItem.addItemsTitle")}</DialogTitle>
        <DialogContent>
          <Box sx={addItemDialogStyles.container}>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={step.get()}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            {step.get() === 0 ? step0 : step1}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="inherit">
            {t("soldierActions.cancelButton")}
          </Button>
          <LoadingButton
            loading={loading.get()}
            variant="contained"
            onClick={goToNextStep}
            color="primary"
            disableElevation
            disabled={step.get() === 0 && (quantity.get() < 1 || !name.get().length)}
          >
            {step.get() === 0 ? t("addItem.nextButtonText") : t("soldierActions.submitButtonText")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddItemDialog;