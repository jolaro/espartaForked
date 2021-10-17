import { Button, Chip, Tooltip } from "@mui/material";
import GenericTable, { ColumnConfig, GenericTableRow } from "components/molecules/GenericTable";
import React from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AddIcon from "@mui/icons-material/Add";
import useTranslate from "hooks/useTranslate";
import SoldierRequestDialog, { isSoldierRequestDialogOpen } from "components/molecules/SoldierRequestDialog";
import { useHookstate } from "@hookstate/core";
import { useSoldierPageTabs } from "hooks/useSoldierPageTabs";
import PageTabs from "components/molecules/PageTabs/PageTabs";
import BodyLayout from "layouts/BodyLayout";

interface SoldierBrowseItemsProps {}

const SoldierBrowseItems: React.FC<SoldierBrowseItemsProps> = () => {
  const t = useTranslate();
  const requestItemId = useHookstate<string | null>(null);
  const pageTabProps = useSoldierPageTabs();

  const handleOpenRequestDialog = (itemId: string) => {
    requestItemId.set(itemId);
    isSoldierRequestDialogOpen.set(true);
  };

  const columns: ColumnConfig[] = [
    {
      title: "Icon",
      id: "icon",
      muiProps: {
        width: "60px",
      },
    },
    {
      title: "Item Name",
      id: "name",
      muiProps: {
        align: "left",
        width: "60%",
      },
    },
    {
      title: "Category",
      id: "category",
      muiProps: {
        align: "center",
      },
    },
    {
      title: "Actions",
      id: "actions",
      muiProps: {
        align: "center",
        width: "5%",
      },
    },
  ];

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

  const rows: GenericTableRow[] = [
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

  return (
    <BodyLayout>
      <PageTabs {...pageTabProps} />
      <GenericTable columns={columns} rows={rows} />
      <SoldierRequestDialog itemId={requestItemId.get() || ""} />
    </BodyLayout>
  );
};

export default SoldierBrowseItems;
