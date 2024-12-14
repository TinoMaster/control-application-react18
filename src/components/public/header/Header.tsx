import { useState, useEffect } from "react";
import { APP_TITLE, PUBLIC_NAV_LINKS } from "../../../core/data/global.data";
import "./Header.css";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  ListItemIcon,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOn, setDrawerOn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setIsScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerOn((prev) => !prev);
  };

  const drawerContent = () => (
    <Box sx={{ backgroundColor: "var(--bg-dark)" }}>
      <Box
        sx={{
          color: "white",
          display: "flex",
          justifyContent: "flex-end",
          padding: "0.8rem 0.8rem 0 0",
        }}
      >
        <IconButton
          onClick={toggleDrawer}
          aria-label="Toggle left drawer"
          color="inherit"
        >
          <MenuOpenRoundedIcon fontSize="large" color="inherit" />
        </IconButton>
      </Box>

      <Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "white" }}>
          {PUBLIC_NAV_LINKS.map((link) => (
            <MenuItem
              component={Link}
              to={link.path}
              key={link.name}
              onClick={toggleDrawer}
              color="inherit"
            >
              <ListItemIcon>
                {link.icon && (
                  <link.icon sx={{ color: "white", fontSize: "1.8rem" }} />
                )}
              </ListItemIcon>
              {link.label}
            </MenuItem>
          ))}
        </Box>
        <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{ mr: 1, backgroundColor: "var(--primary-color)" }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/register"
            sx={{ backgroundColor: "var(--primary-color)" }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer anchor="top" open={drawerOn} onClose={() => {}}>
        {drawerContent()}
      </Drawer>

      <header className={isScrolled ? "bg-indigo" : "bg-transparent"}>
        <nav>
          <div className="nav-logo">
            <div className="logo-placeholder" />
            <span className="logo-text">{APP_TITLE}</span>
          </div>
          <ul className="nav-links">
            {PUBLIC_NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="menu-button">
            <IconButton
              onClick={toggleDrawer}
              aria-label="Toggle left drawer"
              color="inherit"
            >
              <MenuIcon fontSize="large" color="inherit" />
            </IconButton>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
