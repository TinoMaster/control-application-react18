import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserOptions from "../user-options/UserOptions";
import { useAppContext } from "../../../core/context/use/useAppContext";
import { useBusinessContext } from "../../../core/context/use/useBusinessContext";
import { ChooseBusiness } from "../choose-business/ChooseBusiness";

interface HeaderProps {
  handleDrawerToggle: () => void;
}

export const Header = ({ handleDrawerToggle }: HeaderProps) => {
  const { materialTheme } = useAppContext();
  const { business, businessList, onChangeBusiness } = useBusinessContext();
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
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" noWrap>
            {business.name}
          </Typography>
          {businessList.length > 1 && (
            <ChooseBusiness
              selectedId={business.id || 0}
              options={businessList}
              onChangeBusiness={onChangeBusiness}
            />
          )}
        </Box>

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
