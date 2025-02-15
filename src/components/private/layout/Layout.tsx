import { Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../../../core/context/use/useAppContext";
import { useThemeContext } from "../../../core/context/use/useThemeContext";
import { ERole } from "../../../core/models/api";
import { SuperAdminRoutes } from "../../../pages/admin/Admin.routes";
import { PrivateRoutes } from "../../../pages/private";
import { HeaderAdmin } from "../../admin/header/header";
import { SuperAdminSidebar } from "../../admin/sidebar/Sidebar";
import { LoadingCircularProgress } from "../../common/ui/loaders/LoadingCircularProgress";
import { Header } from "../header/Header";
import { PrivateSidebar } from "../sidebar/Sidebar";

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
    return <LoadingCircularProgress loading={loadingThemes} absolute/>;
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
