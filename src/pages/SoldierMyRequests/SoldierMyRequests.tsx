import GenericTable, { ColumnConfig, GenericTableRow } from "components/molecules/GenericTable";
import React, { useEffect, useState } from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { Alert, AlertTitle, Chip } from "@mui/material";
import PageTabs from "components/molecules/PageTabs/PageTabs";
import { useSoldierPageTabs } from "hooks/useSoldierPageTabs";
import BodyLayout from "layouts/BodyLayout";
import useCategoryFilter from "components/molecules/GenericTable/useCategoryFilter";
import useSoldierMyRequests from "./useSoldierMyRequests";
import useTranslate from "hooks/useTranslate";
import GlobalState from "state/GlobalState";

const columns: ColumnConfig[] = [
  {
    title: "table.header.icon",
    id: "icon",
    muiProps: {
      width: "60px",
    },
  },
  {
    title: "table.header.itemName",
    id: "name",
    muiProps: {
      align: "left",
      width: "60%",
    },
  },
  {
    title: "table.header.category",
    id: "category",
    muiProps: {
      align: "center",
    },
  },
  {
    title: "table.header.status",
    id: "status",
    muiProps: {
      align: "center",
      width: "5%",
    },
  },
];

interface SoldierMyRequestsProps {}

const SoldierMyRequests: React.FC<SoldierMyRequestsProps> = () => {
  const t = useTranslate();
  const pageTabProps = useSoldierPageTabs();
  const [fetchedRows, loading] = useSoldierMyRequests();
  const [rows, setRows] = useState<GenericTableRow[]>(fetchedRows);
  const categoryFilter = useCategoryFilter(fetchedRows, setRows);

  useEffect(() => {
    setRows(fetchedRows);
  }, [fetchedRows]);

  return (
    <BodyLayout>
      <PageTabs {...pageTabProps} />
      <GenericTable loading={loading} columns={columns} rows={rows} filters={[...categoryFilter]} />
      {rows.length === 0 && (
        <Alert severity="warning">
          <AlertTitle>{t("soldierActions.noRequestsTitle")}</AlertTitle>
          {t("soldierActions.noRequestsContent")}
        </Alert>
      )}
    </BodyLayout>
  );
};

export default SoldierMyRequests;
