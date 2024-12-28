import { Box, darken, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { INavLinkItem } from "../../../core/types/global.types";
import { useThemeContext } from "../../../core/context/use/useThemeContext";

interface IMenuPagesProps {
  title?: string;
  links: INavLinkItem[];
}

export const MenuPages = ({ title, links }: IMenuPagesProps) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        backgroundImage: `linear-gradient(to right, ${selectedTheme.secondary_color}, ${selectedTheme.primary_color})`,
        zIndex: 10,
        color: selectedTheme.text_color,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "0 0 8px 8px",
        position: "sticky",
        top: "63px",
      }}
    >
      {title && (
        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.2rem", color: "white" }}>
          {title}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          gap: "8px",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            style={({ isActive }) => ({
              textDecoration: "none",
              backgroundColor: isActive
                ? "white"
                : "transparent",
              color: isActive ? darken(selectedTheme.primary_color, 0.8) : "#fefefe",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px 8px",
            })}
          >
            <Typography sx={{ whiteSpace: "nowrap" }} fontSize={"0.8rem"}>
              {link.label}
            </Typography>
          </NavLink>
        ))}
      </Box>
    </Box>
  );
};
