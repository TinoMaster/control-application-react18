import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Grid2 as Grid,
  Typography,
  Container,
  Modal,
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
} from "@mui/material";
import {
  registerOwnerSchema,
  TRegisterOwnerDataModel,
  zRegisterDefaultValues,
} from "../../../core/models/zod";
import CustomInput from "../../../components/common/ui/CustomInput";
import { authService } from "../../../core/services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterOwner = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TRegisterOwnerDataModel>({
    resolver: zodResolver(registerOwnerSchema),
    defaultValues: zRegisterDefaultValues,
  });

  const onSubmit: SubmitHandler<TRegisterOwnerDataModel> = async (data) => {
    setLoading(true);
    setError("");
    const response = await authService.registerOwner(data);

    if (response.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/waiting-confirmation");
      }, 1000);
    } else {
      setError(response.message);
    }
    setLoading(false);
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
      <Modal
        open={loading}
        onClose={() => setLoading(false)}
        aria-labelledby="loading"
        aria-describedby="loading"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress sx={{ color: "var(--primary-color)" }} />
      </Modal>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Registrar Negocio
        </Typography>
        <FormControl onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Campos personales */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="name"
                control={control}
                label="Nombre del Usuario"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="lastName"
                control={control}
                label="Apellido del Usuario"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid size={12}>
              <CustomInput
                name="email"
                type="email"
                control={control}
                label="Correo Electrónico"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="password"
                type="password"
                control={control}
                label="Contraseña"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="confirmPassword"
                type="password"
                control={control}
                label="Confirmar Contraseña"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>
            {/* Campos del negocio */}
            <Grid size={12}>
              <CustomInput
                name="businessName"
                control={control}
                label="Nombre del Negocio"
                error={!!errors.businessName}
                helperText={errors.businessName?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="businessPhone"
                control={control}
                label="Teléfono del Negocio"
                error={!!errors.businessPhone}
                helperText={errors.businessPhone?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="addressMunicipality"
                type="text"
                control={control}
                label="Municipio del Negocio"
                error={!!errors.addressMunicipality}
                helperText={errors.addressMunicipality?.message}
              />
            </Grid>
            <Grid size={12}>
              <CustomInput
                name="businessDescription"
                control={control}
                label="Descripción del Negocio"
                error={!!errors.businessDescription}
                helperText={errors.businessDescription?.message}
              />
            </Grid>
            {/* Dirección */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="addressStreet"
                control={control}
                label="Calle"
                error={!!errors.addressStreet}
                helperText={errors.addressStreet?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="addressNumber"
                control={control}
                label="Número"
                error={!!errors.addressNumber}
                helperText={errors.addressNumber?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="addressCity"
                control={control}
                label="Ciudad"
                error={!!errors.addressCity}
                helperText={errors.addressCity?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="addressZipCode"
                control={control}
                label="Código Postal"
                error={!!errors.addressZipCode}
                helperText={errors.addressZipCode?.message}
              />
            </Grid>
            <Grid size={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ backgroundColor: "var(--primary-color)", py: 1 }}
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Container>
    </>
  );
};

export default RegisterOwner;
