import { useState } from "react";
import { Toolbar, Box, CircularProgress } from "@mui/material";
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
  const { selectedTheme, loadingThemes } = useThemeContext();
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

  if (loadingThemes) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "var(--primary-color)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
          transition: materialTheme.transitions.create("margin", {
            easing: materialTheme.transitions.easing.sharp,
            duration: materialTheme.transitions.duration.leavingScreen,
          }),
          minHeight: "100vh",
          maxWidth: "100vw",
        }}
      >
        <Toolbar />
        {routesToRender()}
      </Box>
    </Box>
  );
};
