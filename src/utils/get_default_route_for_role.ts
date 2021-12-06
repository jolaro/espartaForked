import routes from "router/routes";
import { UserRole } from "interfaces/Role";

export const getDefaultRouteForRole = (role: UserRole) => {
  return routes.find((route) => route.accessLevel?.includes(role));
};

export const getDefaultPathForRole = (role?: UserRole) => {
  if (!role) {
    return routes.find((route) => route.accessLevel?.length === 0)?.path;
  }

  const defaultRoleRoute = getDefaultRouteForRole(role);
  if (!defaultRoleRoute) {
    throw new Error("No route for role found");
  }

  return defaultRoleRoute.path;
};
