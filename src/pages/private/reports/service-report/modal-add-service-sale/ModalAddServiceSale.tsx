import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  darken,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid2 as Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../../../../components/common/ui/CustomInput";
import { useAuthContext } from "../../../../../core/context/use/useAuthContext";
import { useBusinessContext } from "../../../../../core/context/use/useBusinessContext";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { useService } from "../../../../../core/hooks/useServices";
import { EmployeeModel } from "../../../../../core/models/api/employee.model";
import { ServiceSaleModel } from "../../../../../core/models/api/serviceSale.model";
import {
  serviceSaleSchema,
  ServiceSaleSchema,
} from "../../../../../core/models/zod/serviceSaleSchema";
import { employeeService } from "../../../../../core/services/employeeService";

interface ModalAddServiceSaleProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (serviceSale: ServiceSaleModel) => void;
  serviceSale?: ServiceSaleModel;
  isEditing?: boolean;
}

export const ModalAddServiceSale = ({
  open,
  onClose,
  onSubmit,
  serviceSale,
  isEditing = false,
}: ModalAddServiceSaleProps) => {
  const { selectedTheme } = useThemeContext();
  const { user } = useAuthContext();
  const { business } = useBusinessContext();
  const [employee, setEmployee] = useState<EmployeeModel>();

  const { services } = useService({ businessId: business?.id });

  const getEmployee = useCallback(async () => {
    if (user) {
      const response = await employeeService.getEmployeeByUserId(
        user.id as number
      );
      if (response.status === 200) {
        setEmployee(response.data);
      }
    }
  }, [user]);

  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceSaleSchema>({
    resolver: zodResolver(serviceSaleSchema),
    defaultValues: {
      quantity: 0,
      serviceId: 0,
    },
  });

  console.log(errors);

  useEffect(() => {
    if (serviceSale && isEditing) {
      reset({
        quantity: serviceSale.quantity,
        serviceId: serviceSale.service.id,
      });
    }
  }, [serviceSale, isEditing, reset, employee]);

  const handleFormSubmit = (data: ServiceSaleSchema) => {
    const serviceSaleData: ServiceSaleModel = {
      id: serviceSale?.id || undefined,
      quantity: data.quantity,
      service: services.find((s) => s.id === data.serviceId)!,
      employee: employee!,
      business: business?.id as number,
      businessFinalSale: undefined,
    };

    onSubmit(serviceSaleData);
    onClose();
    reset({
      quantity: 0,
      serviceId: 0,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: selectedTheme.background_color,
        },
      }}
    >
      <DialogTitle
        sx={{
          color: selectedTheme.text_color,
          borderBottom: `1px solid ${darken(
            selectedTheme.background_color,
            0.1
          )}`,
        }}
      >
        {isEditing ? "Editar Servicio Vendido" : "Agregar Servicio Vendido"}
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <FormControl
                  fullWidth
                  error={!!errors.serviceId}
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
                  <Controller
                    name="serviceId"
                    control={control}
                    rules={{
                      required: "Este campo es requerido",
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        // ... other Select props
                      >
                        <MenuItem value={0}>Selecciona un servicio</MenuItem>
                        {services.map((service) => (
                          <MenuItem key={service.id} value={service.id}>
                            {service.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid size={12}>
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      label="Cantidad"
                      type="number"
                      error={!!errors.quantity}
                      helperText={errors.quantity?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            borderTop: `1px solid ${darken(
              selectedTheme.background_color,
              0.1
            )}`,
            p: 2,
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              color: selectedTheme.text_color,
              "&:hover": {
                backgroundColor: "var(--error-color)",
                color: "white",
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: selectedTheme.primary_color,
              color: "white",
              "&:hover": {
                backgroundColor: darken(selectedTheme.primary_color, 0.1),
              },
            }}
          >
            {isEditing ? "Guardar Cambios" : "Agregar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
