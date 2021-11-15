import useTranslate from "../../hooks/useTranslate";
import { useEffect, useState } from "react";
import GenericTable, { ColumnConfig, GenericTableRow } from "./GenericTable";
import ApiService from "utils/api_service/api_service";
import { ItemTypesResponse } from "utils/api_service/endpoints.config";

export interface Weapon {
  category_id: number;
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
    title: "Item Name",
    muiProps: {
      width: "70%",
    },
  },
  {
    id: "desired_amount",
    title: "Quantity",
    muiProps: {
      align: "center",
    },
  },
  {
    id: "category",
    title: "Category",
  },
];

export function WeaponsTableBody() {
  const t = useTranslate();
  const [weapons, setWeapons] = useState<ItemTypesResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = async () => {
    setLoading(true);
    const response = await ApiService.get("/api/itemtypes");
    setWeapons(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return <GenericTable columns={columns} rows={weapons as unknown as GenericTableRow[]} loading={loading} />;
}
