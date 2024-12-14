import { Box } from "@mui/material";
import "./BannerHome.css";

export const BannerHome = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="box"></div>
      <h1 className="title">Bienvenido a Control</h1>
      <p className="subtitle">
        Control es un sistema de gestión de inventarios para empresas.
      </p>
      <button className="btn">Learn More</button>
    </Box>
  );
};
