import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid2 as Grid,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../components/common/ui/CustomInput";
import {
  registerEmployeeSchema,
  TRegisterEmployeeDataModel,
  zEmployeeDefaultValues,
} from "../../../../core/models/zod/registerEmployee";
import { useBusinessContext } from "../../../../core/context/use/useBusinessContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { EmployeeModel } from "../../../../core/models/api/employee.model";
import { zodEmployeeToEmployeeMapper } from "../../../../core/mappers/global.mapper";
import { employeeService } from "../../../../core/services/employeeService";
import { useAuthContext } from "../../../../core/context/use/useAuthContext";
import { ERole } from "../../../../core/models/api";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";

const NewEmployee = () => {
  const { businessList, business } = useBusinessContext();
  const { reloadUser } = useAuthContext();
  const { selectedTheme } = useThemeContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TRegisterEmployeeDataModel>({
    resolver: zodResolver(registerEmployeeSchema),
    defaultValues: {
      ...zEmployeeDefaultValues,
    },
  });

  const onSubmit: SubmitHandler<TRegisterEmployeeDataModel> = async (data) => {
    const businessesToSave = businessList.filter((b) =>
      data.businesses.includes(b.id as number)
    );

    setLoading(true);
    setError("");

    const dataToSave: EmployeeModel = zodEmployeeToEmployeeMapper(
      data,
      businessesToSave
    );

    const response = await employeeService.saveEmployee(dataToSave);

    if (response.status === 200) {
      setSuccess(true);
      reloadUser();
      setTimeout(() => {
        navigate("/employees/list");
      }, 1000);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    reset({
      ...zEmployeeDefaultValues,
      businesses: [business.id],
    });
  }, [business, reset]);

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
          Registrar Empleado
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Campos personales */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="name"
                control={control}
                small
                label="Nombre"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="lastName"
                small
                control={control}
                label="Apellido"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="email"
                type="email"
                small
                control={control}
                label="Correo Electrónico"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="dni"
                small
                control={control}
                label="Numero de identidad"
                error={!!errors.dni}
                helperText={errors.dni?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="password"
                type="password"
                small
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
                small
                control={control}
                label="Confirmar Contraseña"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="phone"
                control={control}
                label="Teléfono"
                small
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="addressMunicipality"
                type="text"
                control={control}
                small
                label="Municipio"
                error={!!errors.addressMunicipality}
                helperText={errors.addressMunicipality?.message}
              />
            </Grid>
            {/* Dirección */}
            <Grid size={12}>
              <CustomInput
                name="addressStreet"
                control={control}
                label="Dirección"
                small
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
                startAdornment={"#"}
                small
                error={!!errors.addressNumber}
                helperText={errors.addressNumber?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="addressCity"
                control={control}
                label="Ciudad"
                small
                error={!!errors.addressCity}
                helperText={errors.addressCity?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="fixedSalary"
                control={control}
                label="Salario Fijo"
                startAdornment={"$"}
                type="number"
                required={false}
                small
                error={!!errors.fixedSalary}
                helperText={
                  errors.fixedSalary?.message ||
                  "Salario fijo sobre ventas (opcional)"
                }
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="percentSalary"
                control={control}
                label="Salario en Porcentaje"
                startAdornment={"%"}
                type="number"
                required={false}
                small
                error={!!errors.percentSalary}
                helperText={
                  errors.percentSalary?.message ||
                  "Salario en porcentaje (opcional)"
                }
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                name="addressZipCode"
                control={control}
                label="Código Postal"
                startAdornment={"C.P."}
                small
                error={!!errors.addressZipCode}
                helperText={errors.addressZipCode?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    error={!!errors.role}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: selectedTheme.text_color,
                        "& fieldset": {
                          borderColor: selectedTheme.text_color,
                        },
                        "&:hover fieldset": {
                          borderColor: selectedTheme.text_color,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: selectedTheme.text_color,
                        },
                      },
                      "& .MuiSelect-icon": {
                        color: selectedTheme.text_color,
                      },
                    }}
                  >
                    <Select
                      {...field}
                      labelId="role-label"
                      id="role"
                      value={field.value || ""}
                      // onChange={(event) => field.onChange(event.target.value as ERole)}
                      error={!!errors.role}
                      size="small"
                      label="Rol"
                      sx={{
                        color: selectedTheme.text_color,
                      }}
                    >
                      <MenuItem value="" disabled>
                        Seleccionar
                      </MenuItem>
                      <MenuItem value={ERole.USER}>Espectador</MenuItem>
                      <MenuItem value={ERole.ADMIN}>Administrador</MenuItem>
                      <MenuItem value={ERole.EMPLOYEE}>Empleado</MenuItem>
                    </Select>
                    {errors.role && (
                      <FormHelperText>
                        {errors.role?.message || "Seleccione un rol"}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid
              display={businessList.length === 1 ? "none" : "block"}
              size={12}
            >
              <Accordion
                sx={{
                  backgroundColor: selectedTheme.background_color,
                  color: selectedTheme.text_color,
                  border: `1px solid ${selectedTheme.text_color}`,
                }}
                expanded={expanded}
                onChange={handleChange}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon sx={{ color: selectedTheme.text_color }} />
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography>Negocios</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {businessList.map((item) => (
                    <Controller
                      key={item.id}
                      name="businesses"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          key={item.id}
                          {...field}
                          name="business"
                          control={
                            <Checkbox
                              checked={field.value.includes(item.id as number)} // Verifica si el negocio está en el array
                              onChange={(event) => {
                                const isChecked = event.target.checked;
                                const currentValue = field.value || [];
                                field.onChange(
                                  isChecked
                                    ? [...currentValue, item.id] // Agrega el negocio si está marcado
                                    : currentValue.filter(
                                        (id) => id !== item.id
                                      ) // Remueve el negocio si está desmarcado
                                );
                              }}
                              sx={{
                                color: selectedTheme.text_color,
                                "&.Mui-checked": {
                                  color: selectedTheme.primary_color,
                                },
                              }}
                            />
                          }
                          label={item.name}
                          disabled={item.name === business.name}
                        />
                      )}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid size={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ backgroundColor: selectedTheme.primary_color, py: 1 }}
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
export default NewEmployee;
