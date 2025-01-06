import { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Grid2 as Grid,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  darken,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { ServiceModel } from "../../../../../core/models/api/service.model";
import { CostModel } from "../../../../../core/models/api/cost.model";
import { ConsumableModel } from "../../../../../core/models/api/consumables.model";
import { useBusinessContext } from "../../../../../core/context/use/useBusinessContext";
import { useForm, Controller, useFieldArray, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  serviceSchema,
  ServiceSchema,
  serviceDefaultValues,
} from "../../../../../core/models/zod/serviceSchema";
import CustomInput from "../../../../../components/common/ui/CustomInput";
import { EUnit } from "../../../../../core/models/api/unit.model";

interface CostItemProps {
  index: number;
  control: Control<ServiceSchema>;
  consumables: ConsumableModel[];
  onRemove: () => void;
  errors: any;
  selectedTheme: any;
}

interface ModalAddServiceProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (service: ServiceModel) => void;
  service?: ServiceModel;
  isEditing?: boolean;
  consumables?: ConsumableModel[];
}

export const ModalAddService = ({
  open,
  onClose,
  onSubmit,
  service,
  isEditing = false,
  consumables = [],
}: ModalAddServiceProps) => {
  const { selectedTheme } = useThemeContext();
  const { business } = useBusinessContext();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ServiceSchema>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      price: service?.price.toString() || "",
      costs: service?.costs.map((cost) => ({
        consumable: {
          id: cost.consumable.id,
          name: cost.consumable.name,
        },
        quantity: cost.quantity.toString(),
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "costs",
  });

  useEffect(() => {
    if (service && isEditing) {
      reset({
        name: service.name,
        description: service.description || "",
        price: service.price.toString(),
        costs: service.costs.map((cost) => ({
          consumable: {
            id: cost.consumable.id,
            name: cost.consumable.name,
          },
          quantity: cost.quantity.toString(),
        })),
      });
    }
  }, [service, isEditing, reset]);

  const handleAddCost = () => {
    append({
      consumable: { id: 0, name: "" },
      quantity: "",
    });
  };

  const onFormSubmit = (data: ServiceSchema) => {
    const costs: CostModel[] = data.costs.map((cost) => ({
      consumable: consumables.find(
        (consumable) => consumable.id === cost.consumable.id
      ) as ConsumableModel,
      quantity: parseFloat(cost.quantity),
    }));

    const serviceData: ServiceModel = {
      id: service?.id || undefined,
      name: data.name,
      description: data.description || "",
      price: parseFloat(data.price),
      business: business?.id as number,
      costs: costs,
    };
    onSubmit(serviceData);
  };

  const handleClose = () => {
    reset(serviceDefaultValues);
    onClose();
  };

  const CostItem = ({
    index,
    control,
    consumables,
    onRemove,
    errors,
    selectedTheme,
  }: CostItemProps) => {
    const selectedConsumableId = watch(`costs.${index}.consumable.id`);
    const selectedConsumable = consumables.find(
      (c) => c.id === selectedConsumableId
    );

    const selectStyles = {
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
    };

    return (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          alignItems: "center",
        }}
      >
        <Controller
          name={`costs.${index}.consumable`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl
              fullWidth
              error={!!errors.costs?.[index]?.consumable}
              size="small"
              sx={selectStyles}
            >
              <Select
                value={value.id || ""}
                sx={{
                  width: "100%",
                  color: selectedTheme.text_color,
                }}
                onChange={(e) => {
                  const selectedConsumable = consumables.find(
                    (c) => c.id === e.target.value
                  );
                  onChange({
                    id: selectedConsumable?.id || 0,
                    name: selectedConsumable?.name || "",
                  });
                }}
              >
                <MenuItem value="" disabled>
                  Seleccionar Insumo
                </MenuItem>
                {consumables.map((consumable) => (
                  <MenuItem key={consumable.id} value={consumable.id}>
                    {consumable.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                sx={{ color: darken(selectedTheme.text_color, 0.3) }}
              >
                {errors.costs?.[index]?.consumable?.message ||
                  (selectedConsumable
                    ? `Insumo: ${selectedConsumable.name}`
                    : "Seleccione un insumo")}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name={`costs.${index}.quantity`}
          control={control}
          render={({ field: { ref, ...field } }) => {
            const selectedConsumable = consumables.find(
              (c) => c.id === watch(`costs.${index}.consumable.id`)
            );

            const getHelperText = () => {
              if (errors.costs?.[index]?.quantity?.message) {
                return errors.costs[index].quantity.message;
              }
              if (!selectedConsumable) {
                return "Primero seleccione un insumo";
              }
              return selectedConsumable.unit === EUnit.PIECE
                ? "Cantidad en unidades que se agotan en este servicio"
                : "Cantidad en porcentaje que se agotan en este servicio";
            };

            return (
              <CustomInput
                {...field}
                inputRef={ref}
                type="number"
                label="Cantidad"
                placeholder={
                  selectedConsumable?.unit === EUnit.PIECE
                    ? "ej: 1"
                    : selectedConsumable?.unit === EUnit.PERCENT
                    ? "ej: 0.01"
                    : ""
                }
                startAdornment={
                  selectedConsumable?.unit === EUnit.PIECE
                    ? "u/"
                    : selectedConsumable?.unit === EUnit.PERCENT
                    ? "%"
                    : ""
                }
                error={!!errors.costs?.[index]?.quantity}
                helperText={getHelperText()}
                small
              />
            );
          }}
        />
        <IconButton onClick={onRemove} sx={{ color: selectedTheme.text_color }}>
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: selectedTheme.background_color,
        },
      }}
    >
      <DialogTitle>
        <Typography color={selectedTheme.text_color}>
          {isEditing ? "Editar Servicio" : "Agregar Nuevo Servicio"}
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <CustomInput
                name="name"
                control={control}
                label="Nombre"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid size={12}>
              <CustomInput
                name="description"
                control={control}
                label="Descripción"
                required={false}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid size={12}>
              <CustomInput
                name="price"
                type="number"
                control={control}
                label="Precio"
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>

            {/* Costos */}
            <Grid size={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography color={selectedTheme.text_color}>
                  Costos del Servicio
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleAddCost}
                  sx={{
                    color: "#fff",
                    backgroundColor: selectedTheme.primary_color,
                    "&:hover": {
                      backgroundColor: selectedTheme.primary_color,
                      opacity: 0.8,
                    },
                  }}
                >
                  Agregar Costo
                </Button>
              </Box>
              {fields.map((field, index) => (
                <CostItem
                  key={field.id}
                  index={index}
                  control={control}
                  consumables={consumables}
                  onRemove={() => remove(index)}
                  errors={errors}
                  selectedTheme={selectedTheme}
                />
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleClose}
            sx={{
              color: selectedTheme.text_color,
              "&:hover": {
                backgroundColor: `${selectedTheme.text_color}15`,
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
              color: "#fff",
              "&:hover": {
                backgroundColor: selectedTheme.primary_color,
                opacity: 0.8,
              },
            }}
          >
            {isEditing ? "Guardar Cambios" : "Crear Servicio"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
