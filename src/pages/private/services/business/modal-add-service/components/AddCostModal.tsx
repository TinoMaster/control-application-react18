import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../../../../../components/common/ui/CustomInput";
import { ConsumableModel } from "../../../../../../core/models/api/consumables.model";
import { CostModel } from "../../../../../../core/models/api/cost.model";
import { useTableStyles } from "../../../../../../core/styles/useTableStyles";
import { useThemeContext } from "../../../../../../core/context/use/useThemeContext";
import { EUnit } from "../../../../../../core/models/api/unit.model";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (cost: CostModel) => void;
  consumables: ConsumableModel[];
}

interface CostFormData {
  consumableId: number;
  quantity: string;
}

export const AddCostModal = ({ open, onClose, onSave, consumables }: Props) => {
  const { modalBoxStyle, buttonStyle } = useTableStyles();
  const { selectedTheme } = useThemeContext();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<CostFormData>({
    defaultValues: {
      consumableId: 0,
      quantity: "",
    },
  });

  const selectedConsumableId = watch("consumableId");
  const selectedConsumable = consumables.find(
    (c) => c.id === selectedConsumableId
  );

  const handleAddCost = (data: CostFormData) => {
    const selectedConsumable = consumables.find(
      (c) => c.id === data.consumableId
    );
    if (selectedConsumable) {
      onSave({
        consumable: selectedConsumable,
        quantity: Number(data.quantity),
      });
      reset();
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          ...modalBoxStyle,
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: selectedTheme.text_color, mb: 3 }}
        >
          Agregar Nuevo Costo
        </Typography>

        <form onSubmit={handleSubmit(handleAddCost)}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Controller
              name="consumableId"
              control={control}
              rules={{ required: "Seleccione un insumo" }}
              render={({ field }) => (
                <Select
                  {...field}
                  displayEmpty
                  error={!!errors.consumableId}
                  sx={{
                    backgroundColor: selectedTheme.background_color,
                    color: selectedTheme.text_color,
                  }}
                >
                  <MenuItem value={0} disabled>
                    Seleccione un insumo
                  </MenuItem>
                  {consumables.map((consumable) => (
                    <MenuItem key={consumable.id} value={consumable.id}>
                      {consumable.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <Controller
            name="quantity"
            control={control}
            rules={{
              required: "La cantidad es requerida",
              pattern: {
                value: /^\d*\.?\d*$/,
                message: "Solo números permitidos",
              },
            }}
            render={({ field }) => (
              <CustomInput
                {...field}
                label={`Cantidad (${
                  selectedConsumable?.unit === EUnit.PIECE ? "unidades" : "%"
                })`}
                type="text"
                error={!!errors.quantity}
                helperText={
                  errors.quantity?.message ||
                  "Cantidad que gasta del insumo por cada servicio"
                }
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ ...buttonStyle, mt: 2 }}
          >
            Guardar Costo
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
