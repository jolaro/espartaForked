import useTranslate from "../../hooks/useTranslate";
import { useEffect, useState } from "react";
import GenericTable, { ColumnConfig, GenericTableRow } from "./GenericTable";
import ApiService from "utils/api_service/api_service";
import { DepotListResponse, ItemResponse, ItemTypeResponse } from "utils/api_service/endpoints.config";
import { usePromise } from "hooks/usePromise";
import useCategoryFilter from "./GenericTable/useCategoryFilter";
import CategoryChip from "components/atoms/CategoryChip";
import AddItemDialog from "components/organisms/AddItemDialog";
import { useHookstate } from "@hookstate/core";
import { getPureValue } from "utils/pure_value";
import { Avatar, Box, Chip } from "@mui/material";

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
    id: "id",
    title: "table.header.id",
    muiProps: {
      width: "5%",
    },
  },
  {
    id: "name",
    title: "table.header.itemName",
    muiProps: {
      width: "15%",
    },
  },
  {
    id: "category",
    title: "table.header.category",
    muiProps: {
      align: "left",
      width: "5%",
    },
  },
  {
    id: "desired_amount",
    title: "table.header.quantity",
    muiProps: {
      align: "left",
      width: "65%",
    },
  },
];

const itemToRow = (itemType: ItemTypeResponse, items: ItemResponse[], depots: DepotListResponse[]): GenericTableRow => {
  const itemsOfType = items.filter((it) => it.item_type_id.toString() === itemType.id.toString());
  const groupedByDepot = itemsOfType.reduce((acc, curr) => {
    const inArray = acc.find(
      (it) => it.item.item_type_id.toString() === curr.item_type_id.toString() && it.depot === curr.depot_id,
    );

    if (inArray) {
      inArray.count++;
    } else {
      acc.push({ depot: curr.depot_id, item: curr, count: 1 });
    }

    return acc;
  }, [] as { depot: string | null; item: ItemResponse; count: number }[]);

  return {
    id: itemType.id,
    name: itemType.name,
    desired_amount: (
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {groupedByDepot
          .filter((it) => it.count > 0)
          .sort((it1, it2) => Number(it1.depot || "-1") - Number(it2.depot || "-1"))
          .map((it) => (
            <Chip
              key={it.item.id}
              avatar={<Avatar>{it.count}</Avatar>}
              label={depots.find((d) => d.id.toString() === it.depot?.toString())?.name || "No depot"}
              variant="outlined"
            />
          ))}
      </Box>
    ),
    category: <CategoryChip categoryId={itemType.weight_category} />,
  };
};

export function WeaponsTableBody() {
  const allRows = useHookstate<GenericTableRow[]>([]);
  const rows = useHookstate<GenericTableRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const categoryFilter = useCategoryFilter(getPureValue(allRows), rows.set);

  const fetch = async () => {
    setLoading(true);
    const response = await ApiService.get("/api/itemtypes");
    const itemsResponse = await ApiService.get("/api/items");
    const depots = await ApiService.get("/api/depot");
    const newRows: GenericTableRow[] = response.data.map((it) => itemToRow(it, itemsResponse.data, depots.data));
    return newRows;
  };

  const addNewItems = (item: ItemTypeResponse) => {
    // const newItemRow = itemToRow(item);
    // allRows.merge([newItemRow]);
    // rows.merge([newItemRow]);
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
