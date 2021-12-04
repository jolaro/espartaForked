import { Alert, AlertTitle, Button, Chip, Fab, IconButton, Tooltip } from "@mui/material";
import GenericTable, { ColumnConfig, GenericTableRow } from "components/molecules/GenericTable";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AddIcon from "@mui/icons-material/Add";
import useTranslate from "hooks/useTranslate";
import SoldierRequestDialog, { isSoldierRequestDialogOpen } from "components/molecules/SoldierRequestDialog";
import { none, useHookstate } from "@hookstate/core";
import { useSoldierPageTabs } from "hooks/useSoldierPageTabs";
import PageTabs from "components/molecules/PageTabs/PageTabs";
import BodyLayout from "layouts/BodyLayout";
import useCategoryFilter from "components/molecules/GenericTable/useCategoryFilter";
import ApiService from "utils/api_service/api_service";
import { ItemTypeResponse } from "utils/api_service/endpoints.config";
import { TranslationKeys } from "translations/_translation_interface";
import { snooze } from "utils/snooze";
import { usePromise } from "hooks/usePromise";
import CategoryChip from "components/atoms/CategoryChip";
import RemoveIcon from "@mui/icons-material/Remove";

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
  itemTypes: ItemTypeResponse[],
  addedItemsIds: string[],
  t: (key: TranslationKeys) => string,
  handleButtonClick: (itemId: string) => void,
): GenericTableRow[] => {
  const isItemAdded = (itemId: string) => addedItemsIds.includes(itemId);

  const getRequestButton = (itemId: string) => {
    if (isItemAdded(itemId))
      return (
        <Tooltip title={t("soldierActions.requestRemoveTooltip")}>
          <IconButton color="error" onClick={() => handleButtonClick(itemId)} size="small">
            <RemoveIcon />
          </IconButton>
        </Tooltip>
      );

    return (
      <Tooltip title={t("soldierActions.requestTooltip")}>
        <IconButton color="primary" onClick={() => handleButtonClick(itemId)} size="small">
          <AddIcon />
        </IconButton>
      </Tooltip>
    );
  };

  itemTypes.sort((a, b) => {
    const isItemASelected = addedItemsIds.includes(a.id.toString());
    const isItemBSelected = addedItemsIds.includes(b.id.toString());

    if (isItemASelected && !isItemBSelected) {
      return -1;
    } else if (!isItemASelected && isItemBSelected) {
      return 1;
    } else {
      return 0;
    }
  });

  return itemTypes.map((item) => ({
    icon: <MilitaryTechIcon />,
    name: item.name,
    category: <CategoryChip categoryId={item.weight_category} />,
    actions: getRequestButton(item.id.toString()),
    className: isItemAdded(item.id.toString()) ? "highlighted-table-row animated-row" : "animated-row",
  }));
};

interface SoldierBrowseItemsProps {}

const SoldierBrowseItems: React.FC<SoldierBrowseItemsProps> = () => {
  const t = useTranslate();
  const addedItemsIds = useHookstate<string[]>([]);
  const loading = useHookstate(true);
  const pageTabProps = useSoldierPageTabs();

  const handleButtonClick = (itemId: string) => {
    if (addedItemsIds.get().includes(itemId)) {
      const index = addedItemsIds.get().findIndex((_itemId) => itemId === _itemId);
      addedItemsIds[index].set(none);
    } else {
      addedItemsIds.merge([itemId]);
    }
  };

  const handleSubmit = () => {
    isSoldierRequestDialogOpen.set(true);
  };

  const [fetchedRows, setFetchedRows] = useState<ItemTypeResponse[]>([]);
  const parsedFetchedRows = parseItemTypes(fetchedRows, addedItemsIds.get(), t, handleButtonClick);

  const [rows, setRows] = useState<GenericTableRow[]>(parsedFetchedRows);
  const categoryFilter = useCategoryFilter(parsedFetchedRows, setRows);

  usePromise(
    async (safeUpdate) => {
      safeUpdate(() => {
        setRows(parsedFetchedRows);
      });
    },
    [parsedFetchedRows.length, addedItemsIds.length],
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

  const currentSelectedItems = useMemo(() => {
    return fetchedRows.filter((item) => addedItemsIds.get().includes(item.id.toString()));
  }, [fetchedRows, addedItemsIds]);

  return (
    <BodyLayout>
      <PageTabs {...pageTabProps} />
      {addedItemsIds.length > 0 && (
        <Alert
          action={
            <Button color="inherit" variant="outlined" size="small" onClick={handleSubmit}>
              {t("soldierActions.submitButtonText")}
            </Button>
          }
          severity="info"
          icon={false}
          variant="filled"
          sx={{ mt: 2, mb: 1, "& .MuiAlert-action": { alignItems: "center" } }}
        >
          <AlertTitle>
            {addedItemsIds.length} {t("soldierActions.markedForExportTitle")}
          </AlertTitle>
          {t("soldierActions.markedForExportText")}
        </Alert>
      )}
      <GenericTable loading={loading.get()} columns={columns} rows={rows} filters={[...categoryFilter]} />
      {addedItemsIds.length > 0 && (
        <SoldierRequestDialog items={currentSelectedItems} onSuccess={() => addedItemsIds.set([])} />
      )}
    </BodyLayout>
  );
};

export default SoldierBrowseItems;
