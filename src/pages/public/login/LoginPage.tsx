import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const LoginPage = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          maxWidth: "400px",
          width: "100%",
          color: "var(--text-color)",
          backgroundColor: "var(--bg-dark)",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            marginBottom: "20px",
            backgroundColor: "var(--bg-dark)",
            color: "var(--text-color)",
          }}
        >
          <Paper
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto",
              backgroundImage: "url(../../../assets/logo_white.png)",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              mb: 2,
            }}
          />
          <Typography variant="h6">Entra con tus credenciales</Typography>
        </Box>
        <FormControl
          onSubmit={(e) => e.preventDefault()}
          variant="standard"
          component="form"
          sx={{ width: "100%" }}
        >
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="email"
            slotProps={{
              input: {
                style: { color: "white", borderColor: "white" }, // Color del texto y del borde
              },
              inputLabel: {
                style: { color: "white" }, // Color del texto
              },
            }}
            placeholder="Ingrese su correo electrónico"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Color del borde normal
                },
                "&:hover fieldset": {
                  borderColor: "var(--primary-color)", // Color del borde al pasar el mouse
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--primary-light)", // Color del borde al enfocar
                },
              },
            }}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="password"
            slotProps={{
              input: {
                style: { color: "white", borderColor: "white" }, // Color del texto y del borde
              },
              inputLabel: {
                style: { color: "white" }, // Color del texto
              },
            }}
            placeholder="Ingrese su contraseña"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Color del borde normal
                },
                "&:hover fieldset": {
                  borderColor: "var(--primary-color)", // Color del borde al pasar el mouse
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--primary-light)", // Color del borde al enfocar
                },
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "white",
                    "&.Mui-checked": { color: "var(--primary-color)" },
                  }}
                />
              }
              label="Recuerdame"
            />
            <a href="javascript:void(0)" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          </Box>
          <Button
            variant="contained"
            sx={{
              my: 2,
              width: "100%",
              backgroundColor: "var(--primary-color)",
            }}
          >
            Entrar
          </Button>
        </FormControl>
        <Button
          variant="contained"
          sx={{ width: "100%", backgroundColor: "white", color: "gray" }}
        >
          Continua con Google
        </Button>
        <p className="signup-text">
          No tienes una cuenta?{" "}
          <a href="javascript:void(0)" className="signup-link">
            Registrarse
          </a>
        </p>
      </Box>
    </Box>
  );
};

export default LoginPage;
