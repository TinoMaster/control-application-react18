import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppContext } from "../../../core/context/use/useAppContext";
import UserOptions from "../../private/user-options/UserOptions";

interface HeaderProps {
  handleDrawerToggle: () => void;
}

export const HeaderAdmin = ({ handleDrawerToggle }: HeaderProps) => {
  const { materialTheme } = useAppContext();
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: materialTheme.zIndex.drawer + 1,
        transition: materialTheme.transitions.create(
          ["width", "margin", "background-color", "color"],
          {
            easing: materialTheme.transitions.easing.sharp,
            duration: materialTheme.transitions.duration.leavingScreen,
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
          Control
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
