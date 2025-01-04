import { Box } from "@mui/material";
import { MenuPages } from "../../../components/common/menu-pages/MenuPages";
import { INavLinkItem } from "../../../core/types/global.types";
import { Outlet } from "react-router-dom";

const links: INavLinkItem[] = [
  {
    path: "/inventory/business",
    label: "Copias e impresiones",
    name: "business-inventory",
  },
  {
    path: "/inventory/store",
    label: "Tienda",
    name: "store-inventory",
  },
];

const InventoryLayout = () => {
  return (
    <>
      <MenuPages title="Inventario" links={links} />
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
    </>
  );
};

export default InventoryLayout;
