import useTranslate from "hooks/useTranslate";
import { GenericTableRow, TableFilter } from "./GenericTable";

const useCategoryFilter = (
  rows: GenericTableRow[],
  setRows: React.Dispatch<React.SetStateAction<GenericTableRow[]>>,
  allRows: GenericTableRow[],
) => {
  const t = useTranslate();

  const onCategoryFilter = (value: string) => {
    if (value === "all") {
      setRows(allRows);
      return;
    }

    const filteredRows = allRows.filter(
      (r) => (r.category as JSX.Element).props.label.toLowerCase() === value.toLowerCase(),
    );
    setRows([...filteredRows]);
  };

  const filters: TableFilter[] = [
    {
      label: "Category filter",
      defaultValueIndex: 0,
      options: [
        {
          label: "All",
          value: "all",
        },
        {
          label: "Heavy",
          value: "heavy",
        },
        {
          label: "Light",
          value: "light",
        },
      ],
      type: "select",
      onChange: onCategoryFilter,
    },
  ];

  return filters;
};

export default useCategoryFilter;
