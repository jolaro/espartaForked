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
import { usePromise } from "hooks/usePromise";
import CategoryChip from "components/atoms/CategoryChip";

const columns: ColumnConfig[] = [
  {
    title: "table.header.icon",
    id: "icon",
    muiProps: {
      width: "5%",
    },
  },
  {
    title: "table.header.itemName",
    id: "name",
    muiProps: {
      align: "left",
    },
  },
  {
    title: "table.header.category",
    id: "category",
    muiProps: {
      align: "center",
      width: "8%",
    },
  },
  {
    title: "table.header.actions",
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
    category: <CategoryChip categoryId={item.category_id} />,
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
  const categoryFilter = useCategoryFilter(parsedFetchedRows, setRows);

  usePromise(
    async (safeUpdate) => {
      safeUpdate(() => {
        setRows(parsedFetchedRows);
      });
    },
    [parsedFetchedRows.length],
  );

  usePromise(async (safeUpdate) => {
    loading.set(true);
    const response = await ApiService.get("/api/itemtypes");
    setFetchedRows(response.data);
    await snooze(150);

    safeUpdate(() => {
      loading.set(false);
    });
  });

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
