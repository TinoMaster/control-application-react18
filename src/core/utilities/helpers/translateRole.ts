import { ERole } from "../../models/api";

enum TRANSLATE_ROLE {
  ADMIN = "Administrador",
  USER = "Usuario",
  OWNER = "Propietario",
  EMPLOYEE = "Empleado",
  SUPERADMIN = "Super Administrador",
}

export const translateRole = (role: ERole) => {
  return TRANSLATE_ROLE[role];
};
