import { Weapon } from "./../components/molecules/WeaponsTableBody";
import { SxProps } from "@mui/system";

const BreakpointColors = {
  LOW: "#03a9f4",
  MEDIUM: "#ff9800",
  HIGH: "#ef5350",
};

export const getQuantityStyle = (weapon: Weapon): SxProps => {
  const desiredAmount = weapon.desired_amount;
  let color = BreakpointColors.HIGH;

  if (desiredAmount - 23 > desiredAmount * 0.6) {
    color = BreakpointColors.LOW;
  } else if (desiredAmount - 23 > desiredAmount * 0.3) {
    color = BreakpointColors.MEDIUM;
  }

  return { backgroundColor: color };
};
