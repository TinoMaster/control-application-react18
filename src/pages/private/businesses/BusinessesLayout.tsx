import { Box } from "@mui/material";
import { MenuPages } from "../../../components/common/menu-pages/MenuPages";
import { INavLinkItem } from "../../../core/types/global.types";
import { Outlet } from "react-router-dom";
import { ERole } from "../../../core/models/api";
import { filterRoutesByRole } from "../../../core/utilities/helpers/filterRoutesByRole";
import { useAppContext } from "../../../core/context/use/useAppContext";

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
  const { role } = useAppContext();
  const linksToRender = filterRoutesByRole(links, role);
  return (
    <>
      <MenuPages variant="secondary" title="Negocios" links={linksToRender} />
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
