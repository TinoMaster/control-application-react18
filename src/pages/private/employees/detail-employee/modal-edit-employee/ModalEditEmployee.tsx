import { zodResolver } from "@hookform/resolvers/zod";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  CircularProgress,
  darken,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid2 as Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../../../../../components/common/ui/CustomInput";
import { CustomSnackbar } from "../../../../../components/common/ui/CustomSnackbar";
import { useBusinessContext } from "../../../../../core/context/use/useBusinessContext";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { useStatus } from "../../../../../core/hooks/customs/useStatus";
import { zodEmployeeToEmployeeMapper } from "../../../../../core/mappers/global.mapper";
import { ERole } from "../../../../../core/models/api";
import { EmployeeModel } from "../../../../../core/models/api/employee.model";
import {
  registerEmployeeSchema,
  TRegisterEmployeeDataModel,
  zEmployeeDefaultValues,
} from "../../../../../core/models/zod/registerEmployee";
import { employeeService } from "../../../../../core/services/employeeService";

interface Props {
  open: boolean;
  onClose: () => void;
  employee: EmployeeModel;
  updateEmployee: (employee: EmployeeModel) => void;
}

export const ModalEditEmployee = ({
  open,
  onClose,
  employee,
  updateEmployee,
}: Props) => {
  const { businessList, business } = useBusinessContext();
  const { selectedTheme } = useThemeContext();

  const {
    loading,
    setLoading,
    setSuccess,
    successMessage,
    errorMessage,
    setError,
  } = useStatus();
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

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

    setLoading();

    const dataToSave: EmployeeModel = zodEmployeeToEmployeeMapper(
      data,
      businessesToSave
    );

    // Mantener el ID del empleado existente
    dataToSave.id = employee.id;
    dataToSave.user.id = employee.user.id;
    dataToSave.address.id = employee.address.id;

    const response = await employeeService.updateEmployee(dataToSave);

    if (response.status === 200) {
      setSuccess("Empleado actualizado correctamente");
      if (response.data) {
        const updatedEmployee = response.data;
        updateEmployee(updatedEmployee);
      }
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setError(response.message);
    }
  };

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.user.name.split(" ")[0],
        lastName: employee.user.name.split(" ")[1],
        email: employee.user.email,
        dni: employee.dni,
        phone: employee.phone,
        addressMunicipality: employee.address.municipality,
        addressStreet: employee.address.street,
        addressNumber: employee.address.number,
        addressCity: employee.address.city,
        addressZipCode: employee.address.zip,
        fixedSalary: employee?.fixedSalary?.toString() || "",
        percentSalary: (employee?.percentSalary * 100).toString() || "",
        businesses: employee.user.businesses?.map((b) => b.id as number) || [
          business.id,
        ],
        role: employee.user.role || ERole.EMPLOYEE,
        password: employee.user.password,
        confirmPassword: employee.user.password,
      });
    }
  }, [employee, business, reset]);

  return (
    <>
      <CustomSnackbar
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: darken(selectedTheme.background_color, 0.1),
            color: selectedTheme.text_color,
          }}
        >
          Editar Empleado
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: selectedTheme.background_color,
            color: selectedTheme.text_color,
          }}
        >
          <form id="edit-employee-form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ my: 3 }}>
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
                  label="Correo Electrónico"
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
                      <ExpandMoreIcon
                        sx={{ color: selectedTheme.text_color }}
                      />
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
                                checked={field.value.includes(
                                  item.id as number
                                )}
                                onChange={(event) => {
                                  const isChecked = event.target.checked;
                                  const currentValue = field.value || [];
                                  field.onChange(
                                    isChecked
                                      ? [...currentValue, item.id]
                                      : currentValue.filter(
                                          (id) => id !== item.id
                                        )
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
                            sx={{ color: selectedTheme.text_color }}
                          />
                        )}
                      />
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: selectedTheme.background_color,
            color: selectedTheme.text_color,
          }}
        >
          <Button onClick={onClose} color="inherit">
            Cancelar
          </Button>
          <Button
            type="submit"
            form="edit-employee-form"
            variant="contained"
            disabled={loading}
            sx={{ backgroundColor: selectedTheme.primary_color }}
          >
            {loading ? <CircularProgress size={24} /> : "Guardar Cambios"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
