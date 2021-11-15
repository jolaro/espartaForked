import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { filterStyles } from "../../../styles/mui/filterStyles";
import { Box } from "@mui/system";
import useTranslate from "hooks/useTranslate";

interface FiltersProps {
  onChange: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ onChange }) => {
  const t = useTranslate();

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Box sx={filterStyles.filterContainer}>
      <TextField
        id="input-with-icon-textfield"
        label={t("table.filter.searchLabel")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        fullWidth
        onChange={handleEdit}
      />
    </Box>
  );
};

export default Filters;
