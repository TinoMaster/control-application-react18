import {
  AppBar,
  Box,
  IconButton,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserOptions from "../user-options/UserOptions";
import { useAppContext } from "../../../core/context/use/useAppContext";

interface HeaderProps {
  handleDrawerToggle: () => void;
  theme: Theme;
}

export const Header = ({ handleDrawerToggle, theme }: HeaderProps) => {
  const { appTitle } = useAppContext();
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(
          ["width", "margin", "background-color", "color"],
          {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }
        ),
        backdropFilter: "blur(10px)",
        backgroundImage:
          "linear-gradient(to top, var(--bg-dark-light), var(--bg-dark), var(--bg-dark-dark))",
        borderRadius: "0",
        height: "64px",
        border: "none",
        boxShadow: "none",
        color: "white",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap component="div">
          {appTitle}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <UserOptions />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
