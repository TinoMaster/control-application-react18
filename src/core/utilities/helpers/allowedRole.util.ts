import { TRole } from "../../models/api";

export const allowedRole = (role: TRole, roles: TRole[]): boolean => {
  return roles.includes(role);
};
