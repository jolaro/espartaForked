import GenericTable, { ColumnConfig, GenericTableRow } from "components/molecules/GenericTable";
import React, { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import PageTabs from "components/molecules/PageTabs/PageTabs";
import { useSoldierPageTabs } from "hooks/useSoldierPageTabs";
import BodyLayout from "layouts/BodyLayout";
import useCategoryFilter from "components/molecules/GenericTable/useCategoryFilter";
import useSoldierMyRequests from "./useSoldierMyRequests";
import useTranslate from "hooks/useTranslate";

const columns: ColumnConfig[] = [
  {
    title: "table.header.id",
    id: "id",
    muiProps: {
      align: "left",
      width: "5%",
    },
  },
  {
    title: "table.header.items",
    id: "items",
    muiProps: {
      width: "90%",
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
  console.log("🚀 ~ rows", rows);

  useEffect(() => {
    setRows(fetchedRows);
  }, [fetchedRows]);

  return (
    <BodyLayout>
      <PageTabs {...pageTabProps} />
      <GenericTable loading={loading} columns={columns} rows={rows} />
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
