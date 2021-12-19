import { useHookstate } from "@hookstate/core";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { usePromise } from "hooks/usePromise";
import useTranslate from "hooks/useTranslate";
import React, { useState } from "react";
import ApiService from "utils/api_service/api_service";
import { DepotListResponse } from "utils/api_service/endpoints.config";

interface LocationSelectProps {
  onSelect: (locationId: string) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ onSelect }) => {
  const [isLoading, setIsLoading] = useState(false);
  const depots = useHookstate<DepotListResponse[]>([]);
  const location = useHookstate("0");
  const t = useTranslate();

  const onSelectCallback = (value: string) => {
    location.set(value);
    onSelect(value);
  };

  usePromise(async (safeUpdate) => {
    const depotsRes = await ApiService.get("/api/depot");
    safeUpdate(() => {
      depots.set(depotsRes.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100%" height={56} animation="wave" />;
  }

  return (
    <TextField
      label={t("addItem.locationLabel")}
      select
      defaultValue={depots.get()[0]}
      onChange={(e) => onSelectCallback(e.target.value)}
      fullWidth
    >
      {depots.get().map((depot) => (
        <MenuItem key={depot.id} value={depot.id}>
          {depot.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default LocationSelect;
