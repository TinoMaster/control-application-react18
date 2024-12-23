import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { INavLinkItem } from "../../../core/types/global.types";

interface IMenuPagesProps {
  title?: string;
  links: INavLinkItem[];
}

export const MenuPages = ({ title, links }: IMenuPagesProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        bgcolor: "#EFEFEF",
        color: "text.primary",
        borderRadius: "8px",
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
              backgroundColor: isActive ? "var(--primary-color)" : "gray",
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
