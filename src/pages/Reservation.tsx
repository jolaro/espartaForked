import { Alert, AlertTitle, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { SoldierDetails } from "components/atoms/SoldierDetails";
import { SoldierImage } from "components/atoms/SoldierImage";
import GenericTable, { ColumnConfig } from "components/molecules/GenericTable";
import BodyLayout from "layouts/BodyLayout";
import { reservationStyles } from "styles/mui/reservationStyles";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import WeaponFormDialog from "components/molecules/WeaponDialog";
import { User } from "interfaces/User";
import SoldierFormDialog from "components/molecules/SoldierFormDialog";
import { ItemResponse, RequestItemData } from "utils/api_service/endpoints.config";
import { GenericTableRow } from "components/molecules/GenericTable";
import { useCallback } from "react";
import GlobalState from "state/GlobalState";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import useTranslate from "hooks/useTranslate";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import ScanButton from "components/atoms/ScanButton";
import { LoadingButton } from "@mui/lab";
import ApiService from "utils/api_service/api_service";

interface ReservationProps {}

const weaponColumns: ColumnConfig[] = [
  {
    id: "itemId",
    title: "table.header.id",
    muiProps: {
      width: "60px",
    },
  },
  {
    id: "name",
    title: "table.header.weapon",
  },
  {
    id: "category",
    title: "table.header.category",
  },
  {
    id: "qr_barcode",
    title: "table.header.qrbarcode",
  },
];

const Reservation: React.FC<ReservationProps> = () => {
  const t = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [soldier, setSoldier] = React.useState<User>();
  const [items, setItems1] = React.useState<ItemResponse[]>([]);
  const [rows, setRows] = React.useState<GenericTableRow[]>([]);
  const history = useHistory();

  const addSoldier = (soldier1: User) => {
    handleClickCloseSoldiersDialog();
    setSoldier(soldier1);
  };

  const addWeapons = (weapons: ItemResponse[]) => {
    handleClickCloseWeaponsDialog();
    const newWeapons: ItemResponse[] = [...weapons];
    const newRows: GenericTableRow[] = [];
    if (weapons != null) {
      for (let i = 0; i < weapons.length; i++) {
        newRows.push({
          itemId: weapons[i].id.toString(),
          name: <Typography>{weapons[i].item_type?.name}</Typography>,
          category: <Typography>{weapons[i].item_type?.category}</Typography>,
          qr_barcode: weapons[i].id.toString(),
        });
      }
    }
    setItems1(newWeapons);
    setRows(newRows);
  };

  const [showWeapons, setShowWeapons] = React.useState(false);

  const handleClickOpenWeaponsDialog = () => {
    setShowWeapons(true);
  };

  const handleClickCloseWeaponsDialog = () => {
    setShowWeapons(false);
  };

  const [showSoldiers, setShowSoldiers] = React.useState(false);

  const handleClickOpenSoldiersDialog = () => {
    setShowSoldiers(true);
  };

  const handleClickCloseSoldiersDialog = () => {
    setShowSoldiers(false);
  };

  const showReservations = () => {
    history.push("/manager/assign");
  };

  const createReservation = useCallback(async (it: ItemResponse[], soldier?: User) => {
    if (!GlobalState.user || !soldier) {
      return;
    }

    const { data } = await ApiService.post("/api/requestgroup", {
      borrower_id: soldier.id,
      manager_id: GlobalState.user.id,
      approved: "1",
      depot: "1",
    });

    const requestItems: RequestItemData[] = [];

    for (let i = 0; i < it.length; i++) {
      requestItems.push({
        item_id: it[i].id.toString(),
        item_type_id: it[i].item_type_id,
        request_group_id: Number(data.id),
        date_borrowed: new Date().toLocaleDateString(),
        approved: 1,
      });
    }
    await responseRequestItems(requestItems);
  }, []);

  const responseRequestItems = async (requestItems: RequestItemData[]) => {
    setIsSubmitting(true);
    try {
      const data = await ApiService.post("/api/requestitem", requestItems);
      enqueueSnackbar(t("reservation.reservationCreatedToast"), { variant: "success" });
      showReservations();
    } catch (e) {
      enqueueSnackbar("Error: " + e, { variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BodyLayout>
      <Paper elevation={-1} sx={reservationStyles.sectionBox}>
        <Box sx={reservationStyles.buttonContainer}>
          <Typography variant="h5">{t("reservation.soldierTitle")}</Typography>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpenSoldiersDialog}>
            {t("reservation.addSoldierButton")}
          </Button>
        </Box>
        <div>
          <SoldierFormDialog
            handleClickClose={handleClickCloseSoldiersDialog}
            open={showSoldiers}
            handleAddSoldiers={addSoldier}
          />
          <Box sx={reservationStyles.detailsMainBox}>
            {soldier ? (
              <>
                <SoldierImage name={soldier.name} />
                <SoldierDetails
                  email={soldier.email}
                  name={soldier.name}
                  id={soldier.id.toString()}
                  role={soldier.role}
                />
              </>
            ) : (
              <Alert sx={{ width: "100%" }} severity="warning">
                <AlertTitle>{t("reservation.noSoldierTitle")}</AlertTitle>
                {t("reservation.noSoldierText")}
              </Alert>
            )}
          </Box>
        </div>
      </Paper>
      <Paper elevation={-1} sx={reservationStyles.sectionBox}>
        <Box sx={reservationStyles.buttonContainer}>
          <Typography variant="h5">{t("reservation.weaponsTitle")}</Typography>
          <Stack spacing={1} direction="row">
            <ScanButton />
            <Button variant="outlined" startIcon={<BorderColorIcon />} onClick={handleClickOpenWeaponsDialog}>
              {t("reservation.manualAddButton")}
            </Button>
          </Stack>
        </Box>
        <Box sx={reservationStyles.itemsTableBox}>
          <GenericTable columns={weaponColumns} rows={rows} />
          {rows.length === 0 && (
            <Alert severity="warning">
              <AlertTitle>{t("reservation.noWeaponTitle")}</AlertTitle>
              {t("reservation.noWeaponText")}
            </Alert>
          )}
          <WeaponFormDialog
            handleClickClose={handleClickCloseWeaponsDialog}
            open={showWeapons}
            handleAddWeapons={addWeapons}
          />
        </Box>
      </Paper>

      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
        }}
      >
        <LoadingButton
          color="success"
          variant="contained"
          disableElevation
          startIcon={<CheckIcon />}
          onClick={() => {
            createReservation(items, soldier);
          }}
          disabled={!rows.length || !soldier}
          loading={isSubmitting}
        >
          {t("reservation.createReservationButton")}
        </LoadingButton>
      </Box>
    </BodyLayout>
  );
};

export default Reservation;
