import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
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
  useMediaQuery,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../../core/context/use/useAppContext";
import { PRIVATE_NAV_LINKS } from "../../../core/data/global.data";
import { INavLinkItem } from "../../../core/types/global.types";
import { filterRoutesByRole } from "../../../core/utilities/helpers/filterRoutesByRole";
import { ChooseTheme } from "../../common/choose-theme/ChooseTheme";

interface SidebarProps {
  open: boolean;
  handleDrawerToggle: () => void;
}

export const PrivateSidebar = ({ open, handleDrawerToggle }: SidebarProps) => {
  const { materialTheme, role } = useAppContext();
  const routes: INavLinkItem[] = filterRoutesByRole(PRIVATE_NAV_LINKS, role);

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
        boxShadow: "0 5px 8px rgba(0, 0, 0, 0.2)",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          border: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          height: "73px",
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <List
        dense
        sx={{
          backgroundColor: "var(--bg-dark)",
          height: "100%",
          border: "none",
        }}
      >
        {routes.map((item) => (
          <ListItem key={item.label}>
            <ListItemButton
              sx={{
                padding: 0,
                borderRadius: "4px",
                border: "none",
                "&:hover": { border: "none" },
              }}
            >
              <Badge
                badgeContent={0}
                color="secondary"
                sx={{
                  width: "100%",
                  border: "none",
                  "& .MuiBadge-badge": { border: "none" },
                }}
              >
                <NavLink
                  onClick={handleDrawerToggle}
                  to={item.path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    backgroundColor: isActive ? "#f5f5f5" : "transparent",
                    color: isActive ? "var(--bg-dark)" : "#f5f5f5",
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

      <Divider />
      <ChooseTheme />
    </Drawer>
  );
};
