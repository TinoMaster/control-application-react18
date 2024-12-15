import { Box, Button, Typography } from "@mui/material";
import "./BannerHome.css";
import { Link } from "react-router-dom";

export const BannerHome = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="box"></div>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "var(--primary-color)",
          maxWidth: "750px",
          textAlign: "center",
        }}
      >
        Bienvenido a tu aplicación de gestión para tu negocio de copias.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "var(--text-color)",
          maxWidth: "750px",
          textAlign: "center",
        }}
      >
        Controla tus ventas, inventarios, ve estadisticas, gestiona clientes y
        empleados, y mucho más. Que esperas para empezar?, haz click en el
        siguiente botón para crear tu negocio.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/register"
        sx={{ mt: 2, backgroundColor: "var(--primary-color)" }}
      >
        Empezar
      </Button>
    </Box>
  );
};
