import { MenuItem, TextField } from "@mui/material";
import React from "react";
import { TableFilterOption } from "./GenericTable";

interface SelectFilterProps {
  options: TableFilterOption[];
  label: string;
  defaultValue: number;
  onChange: (value: string) => void;
}

const SelectFilter: React.FC<SelectFilterProps> = ({ defaultValue, options, label, onChange }) => {
  return (
    <TextField
      id="outlined-select-currency"
      select
      label={label}
      defaultValue={options[defaultValue].value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ width: 200 }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectFilter;
