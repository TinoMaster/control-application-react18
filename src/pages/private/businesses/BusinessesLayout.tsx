import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { MenuPages } from "../../../components/common/menu-pages/MenuPages";
import { ERole } from "../../../core/models/api";
import { useAuthStore } from "../../../core/store/auth.store";
import { INavLinkItem } from "../../../core/types/global.types";
import { filterRoutesByRole } from "../../../core/utilities/helpers/filterRoutesByRole";

const links: INavLinkItem[] = [
  {
    path: "/businesses/list",
    label: "Negocios",
    name: "businesses",
  },
  {
    path: "/businesses/new",
    label: "Nuevo Negocio",
    name: "new-business",
    rolesExcluded: [ERole.USER, ERole.ADMIN, ERole.EMPLOYEE],
  },
];

const BusinessesLayout = () => {
  const role = useAuthStore((state) => state.role);
  const linksToRender = filterRoutesByRole(links, role);
  return (
    <>
      <MenuPages title="Negocios" links={linksToRender} />
      <Box
        sx={{
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};
export default BusinessesLayout;
