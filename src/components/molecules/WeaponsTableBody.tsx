import useTranslate from "../../hooks/useTranslate";
import { useEffect, useState } from "react";
import GenericTable, { ColumnConfig, GenericTableRow } from "./GenericTable";
import ApiService from "utils/api_service/api_service";
import { ItemTypesResponse } from "utils/api_service/endpoints.config";

export interface Weapon {
  weight_category: string;
  category?: string;
  created_at: string;
  desired_amount: number;
  current_amount: number;
  id: number;
  image: string;
  name: string;
  price: number;
  updated_at: string;
}

const columns: ColumnConfig[] = [
  {
    id: "name",
    title: "table.header.itemName",
    muiProps: {
      width: "70%",
    },
  },
  {
    id: "desired_amount",
    title: "table.header.quantity",
    muiProps: {
      align: "center",
    },
  },
  {
    id: "category",
    title: "table.header.category",
  },
];

const getCategory = (weight_category: string) => {
  if (weight_category === "0") {
    return "Light";
  } else if (weight_category === "1") {
    return "Medium";
  } else if (weight_category === "2") {
    return "Heavy";
  } else {
    return "";
  }
};

export function WeaponsTableBody() {
  const t = useTranslate();
  const [rows, setRows] = useState<GenericTableRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = async () => {
    setLoading(true);
    const response = await ApiService.get("/api/itemtypes");
    const newRows: GenericTableRow[] = [];

    for (let i = 0; i < response.data.length; i++) {
      newRows.push({
        name: response.data[i].name,
        desired_amount: response.data[i].desired_amount,
        category: getCategory(response.data[i].category_id),
      });
    }
    setRows(newRows);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return <GenericTable columns={columns} rows={rows} loading={loading} />;
}
