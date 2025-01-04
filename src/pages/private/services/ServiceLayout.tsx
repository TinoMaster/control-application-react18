import { Box } from "@mui/material";
import { MenuPages } from "../../../components/common/menu-pages/MenuPages";
import { Outlet } from "react-router-dom";
import { INavLinkItem } from "../../../core/types/global.types";

const links: INavLinkItem[] = [
  {
    path: "/services/business",
    label: "Copias e impresiones",
    name: "business-services",
  },
  {
    path: "/services/store",
    label: "Tienda",
    name: "store-services",
  },
];

const ServiceLayout = () => {
  return (
    <>
      <MenuPages title="Servicios" links={links} />
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

export default ServiceLayout;
