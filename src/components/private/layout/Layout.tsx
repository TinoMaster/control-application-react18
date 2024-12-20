import { useState } from "react";
import {
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
  ListItemButton,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { PrivateRoutes } from "../../../pages/private";
import { PRIVATE_NAV_LINKS } from "../../../core/data/global.data";
import { Header } from "../header/Header";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

export const PrivateLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "var(--bg-light)",
        width: "100",
        color: "var(--text-color)",
      }}
    >
      <Header handleDrawerToggle={handleDrawerToggle} theme={theme} />
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            height: "64px",
          }}
        >
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        <List
          dense
          sx={{
            backgroundImage:
              "linear-gradient(to bottom, var(--bg-dark-light), var(--bg-dark), var(--bg-dark-dark))",
            color: "white",
            height: "100%",
          }}
        >
          <Typography variant="body1" sx={{ padding: "0 10px" }}>
            Paginas
          </Typography>
          {PRIVATE_NAV_LINKS.map((item, index) => (
            <ListItem key={index}>
              <ListItemButton sx={{ padding: 0 }}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    backgroundColor: isActive ? "white" : "transparent",
                    color: isActive ? "var(--bg-dark)" : "#fefefe",
                    width: "100%",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  })}
                >
                  {item.icon && <item.icon />}
                  <ListItemText primary={item.label} />
                </NavLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Contenido Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: theme.spacing(3),
          marginLeft: isMobile ? 0 : open ? `${drawerWidth}px` : "0",
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          minHeight: "100vh",
          height: "2000px",
        }}
      >
        <Toolbar />
        <PrivateRoutes />
      </Box>
    </Box>
  );
};
