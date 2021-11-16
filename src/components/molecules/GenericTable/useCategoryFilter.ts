import { Category } from "./../../../interfaces/Category";
import useTranslate from "hooks/useTranslate";
import { GenericTableRow, TableFilter } from "./GenericTable";

const useCategoryFilter = (
  allRows: GenericTableRow[],
  setRows: React.Dispatch<React.SetStateAction<GenericTableRow[]>>,
) => {
  const t = useTranslate();

  const onCategoryFilter = (value: string) => {
    if (value === "all") {
      setRows(allRows);
      return;
    }

    const filteredRows = allRows.filter(
      (r) => (r.category as JSX.Element).props.categoryId.toLowerCase() === value.toLowerCase(),
    );
    setRows([...filteredRows]);
  };

  const filters: TableFilter[] = [
    {
      label: t("category.filterTitle"),
      defaultValueIndex: 0,
      options: [
        {
          label: t("category.all"),
          value: "all",
        },
        {
          label: t("category.light"),
          value: Category.LIGHT.toString(),
        },
        {
          label: t("category.medium"),
          value: Category.MEDIUM.toString(),
        },
        {
          label: t("category.heavy"),
          value: Category.HEAVY.toString(),
        },
      ],
      type: "select",
      onChange: onCategoryFilter,
    },
  ];

  return filters;
};

export default useCategoryFilter;
