import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableCellProps,
  LinearProgress,
  Box,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { soldierAvailableItemsStyles } from "styles/mui/soldierAvailableItemsStyles";
import Filters from "../Filters/Filters";
import GenericTableBody from "./GenericTableBody";
import SelectFilter from "./SelectFilter";
import { filterStyles } from "../../../styles/mui/filterStyles";
import { TranslationKeys } from "translations/_translation_interface";
import useTranslate from "hooks/useTranslate";

export interface TableFilterOption {
  value: string;
  label: string;
}

export interface TableFilter {
  label: string;
  type: "select";
  options: TableFilterOption[];
  defaultValueIndex: number;
  onChange: (value: string) => void;
}

export interface ColumnConfig {
  title: TranslationKeys;
  id: string;
  muiProps?: TableCellProps;
}

export type GenericTableRow = {
  [key: string]: string | JSX.Element;
};

interface GenericTableProps {
  columns: ColumnConfig[];
  rows: GenericTableRow[];
  filters?: TableFilter[];
  noFilters?: boolean;
  loading?: boolean;
  loadingSkeletonCount?: number;
}

const isString = (value: any): value is string => typeof value === "string";

const GenericTable: React.FC<GenericTableProps> = ({
  columns,
  rows,
  loading,
  filters,
  noFilters = false,
  loadingSkeletonCount = 5,
}) => {
  const t = useTranslate();
  const currentFilterTextRef = useRef<string>("");
  const [filteredRows, setFilteredRows] = useState<GenericTableRow[]>(rows);
  const rowsToShow = !loading ? filteredRows : new Array(loadingSkeletonCount).fill({});

  const filterBySearchText = (row: GenericTableRow) => {
    const filterableValues = Object.values(row).filter(isString);
    return filterableValues.some((_v) => _v.toLowerCase().includes(currentFilterTextRef.current));
  };

  const handleFilterChange = (value: string) => {
    currentFilterTextRef.current = value;
    setFilteredRows([...rows.filter(filterBySearchText)]);
  };

  useEffect(() => {
    const newRows = rows.filter(filterBySearchText);
    setFilteredRows(newRows);
  }, [rows]);

  const renderFilter = (filter: TableFilter) => {
    if (filter.type === "select") {
      return (
        <SelectFilter
          defaultValue={filter.defaultValueIndex}
          options={filter.options}
          label={filter.label}
          key={filter.label}
          onChange={filter.onChange}
        />
      );
    }
  };

  return (
    <>
      {!noFilters && (
        <Box sx={filterStyles.parentFilterContainer}>
          <Filters onChange={handleFilterChange} />
          {filters && filters.map((filter) => renderFilter(filter))}
        </Box>
      )}
      <TableContainer>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} sx={soldierAvailableItemsStyles.tableHead} {...column.muiProps}>
                  {t(column.title)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <GenericTableBody rows={rowsToShow} columns={columns} loading={loading} />
        </Table>
        {loading && <LinearProgress color="inherit" />}
      </TableContainer>
    </>
  );
};

export default GenericTable;
