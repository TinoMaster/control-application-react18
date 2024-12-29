import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useThemeContext } from "../../../core/context/use/useThemeContext";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ThemeModel } from "../../../core/models/api/theme.model";

const ITEM_HEIGHT = 48;

export const ChooseTheme = () => {
  const { selectedTheme, themes, onChangeTheme } = useThemeContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickOption = (theme: ThemeModel) => {
    setAnchorEl(null);
    onChangeTheme(theme);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50px",
          backgroundImage: `linear-gradient(to right, ${selectedTheme.primary_color}, ${selectedTheme.secondary_color})`,
        }}
      >
        <Typography variant="body1" sx={{ padding: "0 15px" }}>
          <span
            style={{
              font: "bold",
              backgroundImage: `linear-gradient(to right, ${selectedTheme.primary_color}, ${selectedTheme.secondary_color})`,
              color: "white",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              textTransform: "uppercase",
            }}
          >
            {selectedTheme.name}
          </span>
        </Typography>
      </Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
        sx={{ position: "absolute", top: 0, right: 0, bottom: 0, color: "white" }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
      >
        {themes.map((theme) => (
          <MenuItem
            key={theme.id}
            selected={theme.id === selectedTheme.id}
            onClick={() => handleClickOption(theme)}
          >
            {theme.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
