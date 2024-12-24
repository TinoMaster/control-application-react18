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
import { useAppContext } from "../../../core/context/use/useAppContext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { PRIVATE_NAV_LINKS } from "../../../core/data/global.data";
import { NavLink } from "react-router-dom";
import { INavLinkItem } from "../../../core/types/global.types";

interface SidebarProps {
  open: boolean;
  handleDrawerToggle: () => void;
}

export const PrivateSidebar = ({ open, handleDrawerToggle }: SidebarProps) => {
  const { materialTheme, role } = useAppContext();
  const routes: INavLinkItem[] = PRIVATE_NAV_LINKS.filter(
    (route) => !route.rolesExcluded?.includes(role)
  );

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
        {routes.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton sx={{ padding: 0, borderRadius: "4px" }}>
              <Badge badgeContent={0} color="secondary" sx={{ width: "100%" }}>
                <NavLink
                  onClick={handleDrawerToggle}
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
