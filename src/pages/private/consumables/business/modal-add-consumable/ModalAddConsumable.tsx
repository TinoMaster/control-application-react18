import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Typography,
  darken,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../../../../../components/common/ui/CustomInput";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { ConsumableModel } from "../../../../../core/models/api/consumables.model";
import {
  EUnit,
  TRANSLATE_UNIT,
} from "../../../../../core/models/api/unit.model";
import {
  TConsumableModel,
  consumableDefaultValues,
  consumableSchema,
} from "../../../../../core/models/zod/consumableSchema";
import { useBusinessStore } from "../../../../../core/store/business.store";

interface ModalAddConsumableProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (consumable: ConsumableModel) => void;
  consumable?: ConsumableModel;
  isEditing?: boolean;
}

export const ModalAddConsumable = ({
  open,
  onClose,
  onSubmit,
  consumable,
  isEditing = false,
}: ModalAddConsumableProps) => {
  const { selectedTheme } = useThemeContext();
  const { business } = useBusinessStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TConsumableModel>({
    resolver: zodResolver(consumableSchema),
    defaultValues: consumableDefaultValues,
  });

  useEffect(() => {
    if (consumable && isEditing) {
      reset({
        name: consumable.name,
        description: consumable.description,
        price: consumable.price.toString(),
        unit: consumable.unit as EUnit,
        stock: consumable.stock.toString(),
      });
    } else {
      reset(consumableDefaultValues);
    }
  }, [consumable, isEditing, reset]);

  const handleFormSubmit: SubmitHandler<TConsumableModel> = (data) => {
    onSubmit({
      ...data,
      business: business?.id as number,
      price: parseFloat(data.price),
      stock: Number(data.stock),
      id: isEditing ? consumable?.id : undefined,
    });
    reset(consumableDefaultValues);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
          maxWidth: "600px",
          bgcolor: selectedTheme.background_color,
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" color={selectedTheme.text_color}>
            {isEditing ? "Editar Insumo" : "Agregar Nuevo Insumo"}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ color: selectedTheme.text_color }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Nombre"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    placeholder="Nombre del insumo"
                    small
                  />
                )}
              />
            </Grid>
            <Grid size={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Descripción"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    placeholder="Descripción del insumo"
                    small
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Precio Total"
                    type="number"
                    error={!!errors.price}
                    helperText={
                      errors.price?.message || "Precio de todo el stock inicial"
                    }
                    startAdornment="$"
                    placeholder="0.00"
                    small
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    error={!!errors.unit}
                    size="small"
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
                      fullWidth
                      sx={{
                        backgroundColor: selectedTheme.background_color,
                      }}
                    >
                      <MenuItem value="" disabled>
                        Unidad de Medida
                      </MenuItem>
                      {Object.values(EUnit).map((unit) => (
                        <MenuItem key={unit} value={unit}>
                          {TRANSLATE_UNIT[unit]}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      sx={{ color: darken(selectedTheme.text_color, 0.3) }}
                    >
                      {errors.unit?.message || "Unidad de Medida"}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={12}>
              <CustomInput
                name="stock"
                label="Stock Inicial"
                control={control}
                type="number"
                error={!!errors.stock}
                helperText={
                  errors.stock?.message ||
                  "Cantidad comprada por el precio total"
                }
                startAdornment="#"
                placeholder="0"
                small
              />
            </Grid>
          </Grid>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              onClick={onClose}
              sx={{
                color: selectedTheme.text_color,
                "&:hover": {
                  backgroundColor: darken(selectedTheme.background_color, 0.1),
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: selectedTheme.secondary_color,
                color: "#fff",
                "&:hover": {
                  backgroundColor: darken(selectedTheme.secondary_color, 0.2),
                },
              }}
            >
              {isEditing ? "Guardar Cambios" : "Agregar Insumo"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
