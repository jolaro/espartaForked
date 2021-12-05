import GenericTable, { ColumnConfig, GenericTableRow } from "components/molecules/GenericTable";
import React, { useEffect, useState } from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { Chip } from "@mui/material";
import PageTabs from "components/molecules/PageTabs/PageTabs";
import { useSoldierPageTabs } from "hooks/useSoldierPageTabs";
import BodyLayout from "layouts/BodyLayout";
import useCategoryFilter from "components/molecules/GenericTable/useCategoryFilter";
import useSoldierMyRequests from "./useSoldierMyRequests";

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
    </BodyLayout>
  );
};

export default SoldierMyRequests;
