import { Box } from "@mui/material";
import { MenuPages } from "../../../components/common/menu-pages/MenuPages";
import { INavLinkItem } from "../../../core/types/global.types";
import { Outlet } from "react-router-dom";

const links: INavLinkItem[] = [
  {
    path: "/employees/list",
    label: "Empleados",
    name: "employees",
  },
  {
    path: "/employees/new",
    label: "Nuevo Empleado",
    name: "new-employee",
  },
];

const EmployeesLayout = () => {
  return (
    <>
      <MenuPages title="Empleados" links={links} />
      <Box
        sx={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Outlet />
      </Box>
    </>
  );
};
export default EmployeesLayout;
