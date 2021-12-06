import { UserRole } from "interfaces/Role";

export const getUserRole = (accessLevel?: string) => {
  switch (accessLevel) {
    case "1":
      return UserRole.COMMANDER;
    case "2":
      return UserRole.OFFICER;
    case "3":
      return UserRole.ADMIN;
    default:
      return UserRole.TROOP;
  }
};
