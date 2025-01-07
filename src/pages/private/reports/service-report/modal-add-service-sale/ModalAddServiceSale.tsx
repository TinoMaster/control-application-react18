import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid2 as Grid,
  MenuItem,
  Select,
  darken,
} from "@mui/material";
import { ServiceSaleModel } from "../../../../../core/models/api/serviceSale.model";
import { ServiceModel } from "../../../../../core/models/api/service.model";
import { EmployeeModel } from "../../../../../core/models/api/employee.model";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  serviceSaleSchema,
  ServiceSaleSchema,
} from "../../../../../core/models/zod/serviceSaleSchema";
import CustomInput from "../../../../../components/common/ui/CustomInput";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { employeeService } from "../../../../../core/services/employeeService";
import { useAuthContext } from "../../../../../core/context/use/useAuthContext";
import { useBusinessContext } from "../../../../../core/context/use/useBusinessContext";

interface ModalAddServiceSaleProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (serviceSale: ServiceSaleModel) => void;
  serviceSale?: ServiceSaleModel;
  isEditing?: boolean;
  services?: ServiceModel[];
}

export const ModalAddServiceSale = ({
  open,
  onClose,
  onSubmit,
  serviceSale,
  isEditing = false,
  services = [],
}: ModalAddServiceSaleProps) => {
  const { selectedTheme } = useThemeContext();
  const { user } = useAuthContext();
  const { business } = useBusinessContext();
  const [employee, setEmployee] = useState<EmployeeModel>();

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
          borderBottom: `1px solid ${darken(selectedTheme.primary_color, 0.1)}`,
        }}
      >
        {isEditing ? "Editar Servicio Vendido" : "Agregar Servicio Vendido"}
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <FormControl fullWidth error={!!errors.serviceId}>
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
            borderTop: `1px solid ${darken(selectedTheme.primary_color, 0.1)}`,
            p: 2,
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              color: selectedTheme.text_color,
              "&:hover": {
                backgroundColor: darken(selectedTheme.primary_color, 0.1),
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
              color: selectedTheme.text_color,
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
