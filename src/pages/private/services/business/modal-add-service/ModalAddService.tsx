import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
  Grid2 as Grid,
  Autocomplete,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { ServiceModel } from "../../../../../core/models/api/service.model";
import { CostModel } from "../../../../../core/models/api/cost.model";
import { ConsumableModel } from "../../../../../core/models/api/consumables.model";
import { useBusinessContext } from "../../../../../core/context/use/useBusinessContext";

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

  const [formData, setFormData] = useState<ServiceModel>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    business: business?.id as number,
    costs: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    if (service && isEditing) {
      setFormData(service);
    }
  }, [service, isEditing]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddCost = () => {
    setFormData((prev) => ({
      ...prev,
      costs: [
        ...prev.costs,
        {
          id: 0,
          consumable: {} as ConsumableModel,
          quantity: 0,
        },
      ],
    }));
  };

  const handleRemoveCost = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      costs: prev.costs.filter((_, i) => i !== index),
    }));
  };

  const handleCostChange = (
    index: number,
    field: keyof CostModel,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      costs: prev.costs.map((cost, i) =>
        i === index ? { ...cost, [field]: value } : cost
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: selectedTheme.text_color,
                    },
                    "&:hover fieldset": {
                      borderColor: selectedTheme.primary_color,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: selectedTheme.text_color,
                  },
                  "& .MuiOutlinedInput-input": {
                    color: selectedTheme.text_color,
                  },
                }}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={3}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: selectedTheme.text_color,
                    },
                    "&:hover fieldset": {
                      borderColor: selectedTheme.primary_color,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: selectedTheme.text_color,
                  },
                  "& .MuiOutlinedInput-input": {
                    color: selectedTheme.text_color,
                  },
                }}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Precio"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: selectedTheme.text_color,
                    },
                    "&:hover fieldset": {
                      borderColor: selectedTheme.primary_color,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: selectedTheme.text_color,
                  },
                  "& .MuiOutlinedInput-input": {
                    color: selectedTheme.text_color,
                  },
                }}
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
              {formData.costs.map((cost, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 2,
                    mb: 2,
                    alignItems: "center",
                  }}
                >
                  <Autocomplete
                    options={consumables}
                    getOptionLabel={(option) => option.name}
                    value={cost.consumable}
                    onChange={(_, newValue) =>
                      handleCostChange(index, "consumable", newValue || {})
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Insumo"
                        required
                        sx={{
                          flex: 2,
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: selectedTheme.text_color,
                            },
                            "&:hover fieldset": {
                              borderColor: selectedTheme.primary_color,
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: selectedTheme.text_color,
                          },
                          "& .MuiOutlinedInput-input": {
                            color: selectedTheme.text_color,
                          },
                        }}
                      />
                    )}
                  />
                  <TextField
                    label="Cantidad"
                    type="number"
                    value={cost.quantity}
                    onChange={(e) =>
                      handleCostChange(
                        index,
                        "quantity",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    required
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: selectedTheme.text_color,
                        },
                        "&:hover fieldset": {
                          borderColor: selectedTheme.primary_color,
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: selectedTheme.text_color,
                      },
                      "& .MuiOutlinedInput-input": {
                        color: selectedTheme.text_color,
                      },
                    }}
                  />
                  <IconButton
                    onClick={() => handleRemoveCost(index)}
                    sx={{ color: selectedTheme.text_color }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={onClose}
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
