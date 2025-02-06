import { Box, darken, Paper, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useThemeContext } from "../../../core/context/use/useThemeContext";
import { usbBanner } from "../../../core/images/images";
import { INavLinkItem } from "../../../core/types/global.types";

interface IMenuPagesProps {
  title?: string;
  links: INavLinkItem[];
}

export const MenuPages = ({ title, links }: IMenuPagesProps) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Box sx={{ position: "relative", backgroundColor: "var(--bg-dark)" }}>
      <Paper
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          background: `
            linear-gradient(to right, var(--bg-dark), transparent 10%),
            linear-gradient(to bottom, var(--bg-dark), transparent 20%),
            linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)),
            linear-gradient(to bottom, transparent, var(--bg-dark)),
            url(${usbBanner})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "5px",
          zIndex: 10,
          color: selectedTheme.text_color,
          position: "sticky",
          top: "63px",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(36, 36, 36, 0.3)",
            backdropFilter: "blur(1px)",
            borderRadius: "5px",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {title && (
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ fontSize: "1.2rem", color: "white" }}
            >
              {title}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              gap: "8px",
              marginLeft: "auto",
              justifyContent: "flex-end",
            }}
          >
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  backgroundColor: isActive ? "white" : "transparent",
                  color: isActive
                    ? darken(selectedTheme.primary_color, 0.8)
                    : "#fefefe",
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
      </Paper>
    </Box>
  );
};
