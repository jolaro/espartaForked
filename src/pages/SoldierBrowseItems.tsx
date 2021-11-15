import { Button, Chip, Tooltip } from "@mui/material";
import GenericTable, { ColumnConfig, GenericTableRow } from "components/molecules/GenericTable";
import React, { useState } from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AddIcon from "@mui/icons-material/Add";
import useTranslate from "hooks/useTranslate";
import SoldierRequestDialog, { isSoldierRequestDialogOpen } from "components/molecules/SoldierRequestDialog";
import { useHookstate } from "@hookstate/core";
import { useSoldierPageTabs } from "hooks/useSoldierPageTabs";
import PageTabs from "components/molecules/PageTabs/PageTabs";
import BodyLayout from "layouts/BodyLayout";
import useCategoryFilter from "components/molecules/GenericTable/useCategoryFilter";

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

interface SoldierBrowseItemsProps {}

const SoldierBrowseItems: React.FC<SoldierBrowseItemsProps> = () => {
  const t = useTranslate();

  const getRequestButton = (itemId: string) => (
    <Tooltip title={t("soldierActions.requestTooltip")}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleOpenRequestDialog(itemId)}
        size="small"
        startIcon={<AddIcon />}
      >
        Request
      </Button>
    </Tooltip>
  );

  const allRows: GenericTableRow[] = [
    {
      icon: <MilitaryTechIcon />,
      name: "AK-47",
      category: <Chip label="Heavy" />,
      actions: getRequestButton("jd98wja98d89921231"),
    },
    {
      icon: <MilitaryTechIcon />,
      name: "M4a1-s",
      category: <Chip label="Light" />,
      actions: getRequestButton("xasda231231231231"),
    },
  ];

  const requestItemId = useHookstate<string | null>(null);
  const pageTabProps = useSoldierPageTabs();
  const [rows, setRows] = useState<GenericTableRow[]>(allRows);
  const categoryFilter = useCategoryFilter(rows, setRows, allRows);

  const handleOpenRequestDialog = (itemId: string) => {
    requestItemId.set(itemId);
    isSoldierRequestDialogOpen.set(true);
  };

  return (
    <BodyLayout>
      <PageTabs {...pageTabProps} />
      <GenericTable columns={columns} rows={rows} filters={[...categoryFilter]} />
      <SoldierRequestDialog itemId={requestItemId.get() || ""} />
    </BodyLayout>
  );
};

export default SoldierBrowseItems;
