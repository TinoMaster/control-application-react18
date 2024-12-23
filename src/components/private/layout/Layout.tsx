import { useState } from "react";
import { Toolbar, Box } from "@mui/material";
import { PrivateRoutes } from "../../../pages/private";
import { Header } from "../header/Header";
import { useAppContext } from "../../../core/context/use/useAppContext";
import { ERole } from "../../../core/models/api";
import { SuperAdminRoutes } from "../../../pages/admin/Admin.routes";
import { SuperAdminSidebar } from "../../admin/Sidebar";
import { PrivateSidebar } from "../sidebar/Sidebar";

export const PrivateLayout = () => {
  const { role, materialTheme } = useAppContext();
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const routesToRender = () => {
    if (role === ERole.SUPERADMIN) {
      return <SuperAdminRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "var(--bg-light)",
        width: "100%",
        color: "var(--text-color)",
      }}
    >
      {/* Header */}
      <Header handleDrawerToggle={handleDrawerToggle} />
      {/* Sidebar */}
      {role === ERole.SUPERADMIN && (
        <SuperAdminSidebar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
        />
      )}
      {role !== ERole.SUPERADMIN && (
        <PrivateSidebar open={open} handleDrawerToggle={handleDrawerToggle} />
      )}
      {/* Contenido Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: { md: "1rem" },
          transition: materialTheme.transitions.create("margin", {
            easing: materialTheme.transitions.easing.sharp,
            duration: materialTheme.transitions.duration.leavingScreen,
          }),
          minHeight: "100vh",
          height: "2000px",
          maxWidth: "100vw",
        }}
      >
        <Toolbar />
        {routesToRender()}
      </Box>
    </Box>
  );
};
