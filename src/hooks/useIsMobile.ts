import theme from "config/theme";
import { useMediaQuery } from "@mui/material";

export const useIsMobile = () => {
  const match = useMediaQuery(theme.breakpoints.down("lg"));

  return match;
};
