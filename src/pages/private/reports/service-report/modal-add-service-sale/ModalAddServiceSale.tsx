import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  Grid2 as Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../../../../components/common/ui/CustomInput";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { useService } from "../../../../../core/hooks/useServices";
import { EmployeeModel } from "../../../../../core/models/api/employee.model";
import { ServiceSaleModel } from "../../../../../core/models/api/serviceSale.model";
import {
  serviceSaleSchema,
  ServiceSaleSchema,
} from "../../../../../core/models/zod/serviceSaleSchema";
import { employeeService } from "../../../../../core/services/employeeService";
import { useBusinessStore } from "../../../../../core/store/business.store";
import { useTableStyles } from "../../../../../core/styles/useTableStyles";
import { useAuthStore } from "../../../../../core/store/auth.store";

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
  const user = useAuthStore((state) => state.user);
  const business = useBusinessStore((state) => state.business);
  const { modalBlurStyle, modalBoxStyle, buttonStyle } = useTableStyles();
  const { services } = useService();

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
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-random-info"
      aria-describedby="modal-random-information"
      sx={modalBlurStyle}
    >
      <Box
        sx={{
          ...modalBoxStyle,
          width: { xs: "90%", sm: 500 },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: selectedTheme.text_color,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: isEditing ? "#ffe500" : selectedTheme.text_color,
              }}
            >
              {isEditing
                ? "Editar Servicio Vendido"
                : "Agregar Servicio Vendido"}
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <DialogContent>
              <Box>
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
                            <MenuItem value={0}>
                              Selecciona un servicio
                            </MenuItem>
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
                p: 2,
              }}
            >
              <Button
                onClick={onClose}
                sx={{
                  color: selectedTheme.text_color,
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "var(--error-color)",
                    color: "white",
                  },
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" sx={buttonStyle}>
                {isEditing ? "Guardar Cambios" : "Agregar"}
              </Button>
            </DialogActions>
          </form>
        </Stack>
      </Box>
    </Modal>
  );
};
