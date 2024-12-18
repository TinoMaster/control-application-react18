import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid2 as Grid, Typography, Container } from "@mui/material";
import {
  registerOwnerSchema,
  TRegisterOwnerDataModel,
} from "../../../core/models/zod";
import CustomInput from "../../../components/common/ui/CustomInput";
import { authService } from "../../../core/services";

const RegisterOwner = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TRegisterOwnerDataModel>({
    resolver: zodResolver(registerOwnerSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      businessName: "",
      businessPhone: "",
      businessEmail: "",
      businessDescription: "",
      addressStreet: "",
      addressNumber: "",
      addressCity: "",
      addressZipCode: "",
    },
  });

  const onSubmit: SubmitHandler<TRegisterOwnerDataModel> = async (data) => {
    const response = await authService.registerOwner(data);

    console.log(response);

    if (response.status === 200) {
      console.log(response.data);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Registrar Propietario
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Campos personales */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomInput
              name="name"
              control={control}
              label="Nombre"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomInput
              name="lastName"
              control={control}
              label="Apellido"
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
              name="businessEmail"
              type="email"
              control={control}
              label="Correo del Negocio"
              error={!!errors.businessEmail}
              helperText={errors.businessEmail?.message}
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
              sx={{ backgroundColor: "var(--primary-color)", py: 1 }}
            >
              Registrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterOwner;
