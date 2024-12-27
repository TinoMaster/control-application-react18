import { useState } from "react";
import { Toolbar, Box } from "@mui/material";
import { PrivateRoutes } from "../../../pages/private";
import { Header } from "../header/Header";
import { useAppContext } from "../../../core/context/use/useAppContext";
import { ERole } from "../../../core/models/api";
import { SuperAdminRoutes } from "../../../pages/admin/Admin.routes";
import { PrivateSidebar } from "../sidebar/Sidebar";
import { SuperAdminSidebar } from "../../admin/sidebar/Sidebar";
import { HeaderAdmin } from "../../admin/header/header";
import { useThemeContext } from "../../../core/context/use/useThemeContext";

export const PrivateLayout = () => {
  const {selectedTheme} = useThemeContext();
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
        backgroundColor: selectedTheme.background_color,
        width: "100%",
        color: selectedTheme.text_color,
      }}
    >
      {/* Header */}

      {/* Sidebar */}
      {role === ERole.SUPERADMIN && (
        <>
          <HeaderAdmin handleDrawerToggle={handleDrawerToggle} />
          <SuperAdminSidebar
            open={open}
            handleDrawerToggle={handleDrawerToggle}
          />
        </>
      )}
      {role !== ERole.SUPERADMIN && (
        <>
          <Header handleDrawerToggle={handleDrawerToggle} />
          <PrivateSidebar open={open} handleDrawerToggle={handleDrawerToggle} />
        </>
      )}
      {/* Contenido Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: {xs: "0.5rem", md: "1rem" },
          transition: materialTheme.transitions.create("margin", {
            easing: materialTheme.transitions.easing.sharp,
            duration: materialTheme.transitions.duration.leavingScreen,
          }),
          minHeight: "100vh",
          maxWidth: "100vw",
          mt: "10px",
        }}
      >
        <Toolbar />
        {routesToRender()}
      </Box>
    </Box>
  );
};
