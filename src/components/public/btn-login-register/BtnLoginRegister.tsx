import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const BtnLoginRegister = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant="contained"
        component={Link}
        to="/login"
        sx={{ mr: 1, backgroundColor: "var(--primary-color)" }}
        size="small"
      >
        Acceder
      </Button>
      {/* <Button
        variant="contained"
        component={Link}
        to="/register"
        sx={{ backgroundColor: "var(--primary-color)" }}
        size="small"
      >
        Registrarse
      </Button> */}
    </Box>
  );
};
