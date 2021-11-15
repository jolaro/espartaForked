import GenericTable, { ColumnConfig, GenericTableRow } from "components/molecules/GenericTable";
import React, { useState } from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { Chip } from "@mui/material";
import PageTabs from "components/molecules/PageTabs/PageTabs";
import { useSoldierPageTabs } from "hooks/useSoldierPageTabs";
import BodyLayout from "layouts/BodyLayout";
import useCategoryFilter from "components/molecules/GenericTable/useCategoryFilter";

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
    title: "Status",
    id: "status",
    muiProps: {
      align: "center",
      width: "5%",
    },
  },
];

const allRows: GenericTableRow[] = [
  {
    icon: <MilitaryTechIcon />,
    name: "AK-47",
    category: <Chip label="Heavy" />,
    status: <Chip label="Returned" />,
  },
  {
    icon: <MilitaryTechIcon />,
    name: "M4a1-s",
    category: <Chip label="Light" />,
    status: <Chip color="error" label="In use" />,
  },
];

interface SoldierMyRequestsProps {}

const SoldierMyRequests: React.FC<SoldierMyRequestsProps> = () => {
  const pageTabProps = useSoldierPageTabs();
  const [rows, setRows] = useState<GenericTableRow[]>(allRows);
  const categoryFilter = useCategoryFilter(rows, setRows, allRows);

  return (
    <BodyLayout>
      <PageTabs {...pageTabProps} />
      <GenericTable columns={columns} rows={rows} filters={[...categoryFilter]} />
    </BodyLayout>
  );
};

export default SoldierMyRequests;
