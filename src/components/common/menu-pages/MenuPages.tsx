import { Box, Typography } from "@mui/material";
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
        backgroundImage: `linear-gradient(to right, ${selectedTheme.primary_color}, ${selectedTheme.background_color})`,
        zIndex: 10,
        color: selectedTheme.text_color,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        position: "sticky",
        top: "63px",
      }}
    >
      {title && (
        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.2rem" }}>
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
              backgroundColor: isActive ? selectedTheme.secondary_color : "transparent",
              color: isActive ? "white" : "#fefefe",
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
