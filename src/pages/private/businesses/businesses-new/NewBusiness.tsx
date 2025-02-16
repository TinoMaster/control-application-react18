import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Grid2 as Grid,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../components/common/ui/CustomInput";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { zodRegisterBusinessToBusinessMapper } from "../../../../core/mappers/global.mapper";
import { BusinessModel } from "../../../../core/models/api";
import {
  RegisterBusinessDataModel,
  registerBusinessSchema,
  zBusinessDefaultValues,
} from "../../../../core/models/zod/registerBusiness";
import { businessService } from "../../../../core/services/businessService";
import { useBusinessStore } from "../../../../core/store/business.store";
import { useAuthStore } from "../../../../core/store/auth.store";

const NewBusiness = () => {
  const { selectedTheme } = useThemeContext();
  const user = useAuthStore((state) => state.user);
  const addBusinessToBusinessList = useBusinessStore(
    (state) => state.addBusinessToBusinessList
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterBusinessDataModel>({
    resolver: zodResolver(registerBusinessSchema),
    defaultValues: zBusinessDefaultValues,
  });

  const onSubmit: SubmitHandler<RegisterBusinessDataModel> = async (data) => {
    setLoading(true);
    const dataToSave: BusinessModel = zodRegisterBusinessToBusinessMapper(
      data,
      user?.id as number
    );

    const response = await businessService.saveBusiness(dataToSave);

    if (response.status === 200) {
      setSuccess(true);
      addBusinessToBusinessList(response.data as BusinessModel);
      setTimeout(() => {
        navigate("/businesses/list");
      }, 2000);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Campos personales */}
            <Grid size={12}>
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
                name="phone"
                control={control}
                label="Teléfono"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="addressMunicipality"
                type="text"
                control={control}
                label="Municipio"
                error={!!errors.addressMunicipality}
                helperText={errors.addressMunicipality?.message}
              />
            </Grid>
            {/* Dirección */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="addressStreet"
                control={control}
                label="Dirección"
                placeholder="Ej: calle 41 e/42 y 36"
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
              <CustomInput
                name="description"
                control={control}
                label="Descripción"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid size={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ backgroundColor: selectedTheme.secondary_color, py: 1 }}
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};
export default NewBusiness;
