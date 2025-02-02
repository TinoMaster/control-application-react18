import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  darken,
  Grid2 as Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import CustomInput from "../../../../../components/common/ui/CustomInput";
import { useBusinessContext } from "../../../../../core/context/use/useBusinessContext";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { ConsumableModel } from "../../../../../core/models/api/consumables.model";
import { CostModel } from "../../../../../core/models/api/cost.model";
import { ServiceModel } from "../../../../../core/models/api/service.model";
import {
  ServiceSchema,
  serviceDefaultValues,
  serviceSchema,
} from "../../../../../core/models/zod/serviceSchema";
import { useTableStyles } from "../../../../../core/styles/useTableStyles";
import { CostItem } from "./components/CostItem";
import { AddCostModal } from "./components/AddCostModal";

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
  const { modalBlurStyle, modalBoxStyle, buttonStyle, buttonOutlineStyle } =
    useTableStyles();

  const [openCostModal, setOpenCostModal] = useState(false);

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
    setOpenCostModal(true);
  };

  const handleSaveCost = (cost: CostModel) => {
    append({
      consumable: {
        id: cost.consumable.id as number,
        name: cost.consumable.name,
      },
      quantity: cost.quantity.toString(),
    });
    setOpenCostModal(false);
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

  return (
    <Modal open={open} onClose={onClose} sx={modalBlurStyle}>
      <Box sx={{ ...modalBoxStyle, maxWidth: "500px" }}>
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
              {isEditing ? "Editar Servicio" : "Agregar Nuevo Servicio"}
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid container spacing={2}>
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

                <Box sx={{ mt: 2, width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ color: selectedTheme.text_color }}
                    >
                      Costos del Servicio
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleAddCost}
                      sx={{
                        ...buttonOutlineStyle,
                      }}
                      startIcon={<AddIcon />}
                    >
                      Agregar Costo
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      px: 2,
                      py: 1,
                      minHeight: "100px",
                      backgroundColor: darken(
                        selectedTheme.background_color,
                        0.1
                      ),
                      borderRadius: "8px",
                      boxShadow:
                        "inset 0px 2px 4px rgba(0, 0, 0, 0.15), inset 0px 4px 8px rgba(0, 0, 0, 0.10)",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        boxShadow:
                          "inset 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 4px 8px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                  >
                    {fields.length === 0 ? (
                      <Typography
                        sx={{
                          color: selectedTheme.text_color,
                          opacity: 0.6,
                          textAlign: "center",
                          fontStyle: "italic",
                        }}
                      >
                        No hay costos agregados
                      </Typography>
                    ) : (
                      fields.map((field, index) => (
                        <CostItem
                          key={field.id}
                          index={index}
                          control={control}
                          consumables={consumables}
                          onRemove={() => remove(index)}
                          selectedTheme={selectedTheme}
                          watch={watch}
                        />
                      ))
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              sx={{ gap: 2, mt: 2 }}
            >
              <Button onClick={handleClose} sx={buttonOutlineStyle}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" sx={buttonStyle}>
                {isEditing ? "Guardar Cambios" : "Crear Servicio"}
              </Button>
            </Grid>
          </form>
        </Stack>

        <AddCostModal
          open={openCostModal}
          onClose={() => setOpenCostModal(false)}
          onSave={handleSaveCost}
          consumables={consumables}
        />
      </Box>
    </Modal>
  );
};
