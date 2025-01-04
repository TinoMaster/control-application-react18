import { Box } from "@mui/material";
import { MenuPages } from "../../../components/common/menu-pages/MenuPages";
import { Outlet } from "react-router-dom";
import { INavLinkItem } from "../../../core/types/global.types";

const links: INavLinkItem[] = [
    {
      path: "/consumables/business",
      label: "Copias e impresiones",
      name: "business-consumables",
    },
    {
      path: "/consumables/store",
      label: "Tienda",
      name: "store-consumables",
    },
  ];

const ConsumableLayout = () => {
  return <>
  <MenuPages title="Insumos" links={links} />
  <Box
    sx={{
      padding: { xs: "16px 10px", md: "16px 20px" },
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <Outlet />
  </Box>
</>;
};

export default ConsumableLayout;
