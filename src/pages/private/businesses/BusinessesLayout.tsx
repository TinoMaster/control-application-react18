import { Box } from "@mui/material";
import { MenuPages } from "../../../components/common/menu-pages/MenuPages";
import { INavLinkItem } from "../../../core/types/global.types";
import { Outlet } from "react-router-dom";

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
  },
];

const BusinessesLayout = () => {
  return (
    <>
    <MenuPages title="Negocios" links={links} />
      <Box
        sx={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Outlet />
      </Box>
    </>
  )
}
export default BusinessesLayout