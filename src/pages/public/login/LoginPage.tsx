import {
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid2,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  loginSchema,
  TLoginSchema,
  zLoginDefaultValues,
} from "../../../core/models/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../../components/common/ui/CustomInput";
import { useState } from "react";
import { authService } from "../../../core/services";
import { ILoginResponse } from "../../../core/types/request.types";

const boxLoginStyle = {
  maxWidth: "400px",
  width: "100%",
  color: "var(--text-color)",
  backgroundColor: "var(--bg-dark)",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const boxImageTitleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  backgroundColor: "var(--bg-dark)",
  color: "var(--text-color)",
};

const imageStyle = {
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
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: zLoginDefaultValues,
  });

  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    setLoading(true);
    setError("");
    const response = await authService.login(data);

    console.log(response);

    if (response.status === 200 && response.data) {
      setSuccess(true);

      if (response.data.active) {
        onSuccessLogin(response.data);
      }

      setTimeout(() => {
        navigate(
          response.data?.active ? "/app/dashboard" : "/waiting-confirmation"
        );
      }, 1000);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  const onSuccessLogin = (data: ILoginResponse) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("role", data.role);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!!error || success}
        autoHideDuration={6000}
        onClose={() => setError("")}
        message={error}
      >
        <Alert
          severity={success ? "success" : "error"}
          onClose={() => setError("")}
        >
          {success ? "Usuario registrado correctamente" : error}
        </Alert>
      </Snackbar>

      <Backdrop
        open={loading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress sx={{ color: "var(--primary-color)" }} />
      </Backdrop>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={boxLoginStyle}>
          <Box sx={boxImageTitleStyle}>
            <Paper sx={imageStyle} />
            <Typography variant="h6">Entra con tus credenciales</Typography>
          </Box>
          <FormControl
            onSubmit={handleSubmit(onSubmit)}
            variant="standard"
            component="form"
            sx={{ width: "100%" }}
          >
            <Grid2 container spacing={2}>
              <Grid2 size={12}>
                <CustomInput
                  name="email"
                  control={control}
                  label="Correo Electrónico"
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid2>
              <Grid2 size={12}>
                <CustomInput
                  name="password"
                  control={control}
                  label="Contraseña"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid2>
            </Grid2>

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
              <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </Box>
            <Button
              type="submit"
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
            type="button"
            variant="contained"
            sx={{ width: "100%", backgroundColor: "white", color: "gray" }}
          >
            Continua con Google
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <span className="or-text">O</span>
          </Box>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <p className="signup-text">
              No tienes una cuenta? <Link to="/register">Registrarse</Link>
            </p>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
