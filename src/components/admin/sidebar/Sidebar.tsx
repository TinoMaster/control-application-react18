import {
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { NavLink } from "react-router-dom";
import { useAppContext } from "../../../core/context/use/useAppContext";
import { useSuperAdminContext } from "../../../core/context/use/useSuperAdminContext";
import {
  AppRoutes,
  SUPERADMIN_NAV_LINKS,
} from "../../../core/data/global.data";

interface SidebarProps {
  open: boolean;
  handleDrawerToggle: () => void;
}

export const SuperAdminSidebar = ({
  open,
  handleDrawerToggle,
}: SidebarProps) => {
  const { materialTheme } = useAppContext();
  const { authRequests } = useSuperAdminContext();
  const drawerWidth = 240;
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));

  return (
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
          height: "69px",
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
          border: "2px solid var(--primary-color)",
          margin: "1px",
        }}
      >
        <Typography variant="body1" sx={{ padding: "0 15px" }}>
          <span
            style={{
              font: "bold",
              backgroundColor: "var(--primary-color)",
              color: "white",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              textTransform: "uppercase",
            }}
          >
            Paginas
          </span>
        </Typography>
        {SUPERADMIN_NAV_LINKS.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton sx={{ padding: 0, borderRadius: "4px" }}>
              <Badge
                badgeContent={
                  item.path === AppRoutes.super_admin.auth_requests
                    ? authRequests.length
                    : 0
                }
                color="secondary"
                sx={{ width: "100%" }}
              >
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
                  {item.icon && <item.icon style={{ fontSize: "21px" }} />}
                  <ListItemText primary={item.label} />
                </NavLink>
              </Badge>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
