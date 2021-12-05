import useTranslate from "../../hooks/useTranslate";
import { useEffect, useState } from "react";
import GenericTable, { ColumnConfig, GenericTableRow } from "./GenericTable";
import ApiService from "utils/api_service/api_service";
import { ItemTypeResponse } from "utils/api_service/endpoints.config";
import { usePromise } from "hooks/usePromise";
import useCategoryFilter from "./GenericTable/useCategoryFilter";
import CategoryChip from "components/atoms/CategoryChip";
import AddItemDialog from "components/organisms/AddItemDialog";
import { useHookstate } from "@hookstate/core";
import { getPureValue } from "utils/pure_value";

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
      width: "60%",
    },
  },
  {
    id: "desired_amount",
    title: "table.header.quantity",
    muiProps: {
      align: "center",
      width: "20%",
    },
  },
  {
    id: "category",
    title: "table.header.category",
    muiProps: {
      align: "center",
      width: "20%",
    },
  },
];

const itemToRow = (item: ItemTypeResponse): GenericTableRow => ({
  name: item.name,
  desired_amount: item.desired_amount,
  category: <CategoryChip categoryId={item.weight_category} />,
});

export function WeaponsTableBody() {
  const allRows = useHookstate<GenericTableRow[]>([]);
  const rows = useHookstate<GenericTableRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const categoryFilter = useCategoryFilter(getPureValue(allRows), rows.set);

  const fetch = async () => {
    setLoading(true);
    const response = await ApiService.get("/api/itemtypes");
    const newRows: GenericTableRow[] = response.data.map(itemToRow);
    return newRows;
  };

  const addNewItems = (item: ItemTypeResponse) => {
    const newItemRow = itemToRow(item);

    allRows.merge([newItemRow]);
    rows.merge([newItemRow]);
  };

  usePromise(async (safeUpdate) => {
    const newRows = await fetch();
    safeUpdate(() => {
      rows.set(newRows);
      allRows.set(newRows);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <AddItemDialog onSuccess={addNewItems} />
      <GenericTable columns={columns} rows={getPureValue(rows)} loading={loading} filters={[...categoryFilter]} />
    </>
  );
}
