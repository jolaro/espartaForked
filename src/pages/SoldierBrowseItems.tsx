import { Button, Chip, Tooltip } from "@mui/material";
import GenericTable, { ColumnConfig, GenericTableRow } from "components/molecules/GenericTable";
import React, { useCallback, useEffect, useState } from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AddIcon from "@mui/icons-material/Add";
import useTranslate from "hooks/useTranslate";
import SoldierRequestDialog, { isSoldierRequestDialogOpen } from "components/molecules/SoldierRequestDialog";
import { useHookstate } from "@hookstate/core";
import { useSoldierPageTabs } from "hooks/useSoldierPageTabs";
import PageTabs from "components/molecules/PageTabs/PageTabs";
import BodyLayout from "layouts/BodyLayout";
import useCategoryFilter from "components/molecules/GenericTable/useCategoryFilter";
import ApiService from "utils/api_service/api_service";
import { ItemTypesResponse } from "utils/api_service/endpoints.config";
import { TranslationKeys } from "translations/_translation_interface";
import { snooze } from "utils/snooze";

const columns: ColumnConfig[] = [
  {
    title: "Icon",
    id: "icon",
    muiProps: {
      width: "5%",
    },
  },
  {
    title: "Item Name",
    id: "name",
    muiProps: {
      align: "left",
    },
  },
  {
    title: "Category",
    id: "category",
    muiProps: {
      align: "center",
      width: "8%",
    },
  },
  {
    title: "Actions",
    id: "actions",
    muiProps: {
      align: "center",
      width: "8%",
    },
  },
];

const parseItemTypes = (
  itemTypes: ItemTypesResponse[],
  t: (key: TranslationKeys) => string,
  handleOpenRequestDialog: (itemId: string) => void,
): GenericTableRow[] => {
  const getRequestButton = (itemId: string) => (
    <Tooltip title={t("soldierActions.requestTooltip")}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleOpenRequestDialog(itemId)}
        size="small"
        startIcon={<AddIcon />}
      >
        {t("soldierActions.requestButtonText")}
      </Button>
    </Tooltip>
  );

  return itemTypes.map((item) => ({
    icon: <MilitaryTechIcon />,
    name: item.name,
    category: <Chip label={item.weight_category} />,
    actions: getRequestButton(item.id.toString()),
  }));
};

interface SoldierBrowseItemsProps {}

const SoldierBrowseItems: React.FC<SoldierBrowseItemsProps> = () => {
  const t = useTranslate();
  const requestItemId = useHookstate<string | null>(null);
  const loading = useHookstate(true);
  const pageTabProps = useSoldierPageTabs();

  const handleOpenRequestDialog = (itemId: string) => {
    requestItemId.set(itemId);
    isSoldierRequestDialogOpen.set(true);
  };

  const [fetchedRows, setFetchedRows] = useState<ItemTypesResponse[]>([]);
  const parsedFetchedRows = parseItemTypes(fetchedRows, t, handleOpenRequestDialog);

  const [rows, setRows] = useState<GenericTableRow[]>(parsedFetchedRows);
  const categoryFilter = useCategoryFilter(rows, setRows, parsedFetchedRows);

  const fetchItemTypes = useCallback(async () => {
    loading.set(true);
    const response = await ApiService.get("/api/itemtypes");
    setFetchedRows(response.data);
    await snooze(150);
    loading.set(false);
  }, []);

  useEffect(() => {
    setRows(parsedFetchedRows);
  }, [parsedFetchedRows.length]);

  useEffect(() => {
    fetchItemTypes();
  }, []);

  return (
    <BodyLayout>
      <PageTabs {...pageTabProps} />
      <GenericTable loading={loading.get()} columns={columns} rows={rows} filters={[...categoryFilter]} />
      {requestItemId.get() && (
        <SoldierRequestDialog name={fetchedRows.find((item) => item.id.toString() === requestItemId.get())!.name} />
      )}
    </BodyLayout>
  );
};

export default SoldierBrowseItems;
