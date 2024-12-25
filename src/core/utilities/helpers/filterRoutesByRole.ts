import { TRole } from "../../models/api";
import { INavLinkItem } from "../../types/global.types";

export const filterRoutesByRole = (routes: INavLinkItem[], role: TRole) => {
  return routes.filter((route) => !route.rolesExcluded?.includes(role));
};
