import DeleteIcon from "@mui/icons-material/Delete";
import { Grid2 as Grid, IconButton, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { ConsumableModel } from "../../../../../../core/models/api/consumables.model";
import { EUnit } from "../../../../../../core/models/api/unit.model";
import { ServiceSchema } from "../../../../../../core/models/zod/serviceSchema";

interface CostItemProps {
  index: number;
  control: Control<ServiceSchema>;
  consumables: ConsumableModel[];
  onRemove: () => void;
  selectedTheme: any;
  watch: any;
}

export const CostItem = ({
  index,
  control,
  consumables,
  onRemove,
  selectedTheme,
  watch,
}: CostItemProps) => {
  const selectedConsumableId = watch(`costs.${index}.consumable.id`);
  const selectedConsumable = consumables.find(
    (c) => c.id === selectedConsumableId
  );

  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "baseline",
      }}
    >
      <Grid size={6}>
        <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
          {selectedConsumable?.name || "Sin insumo seleccionado"}
        </Typography>
      </Grid>

      <Grid size={5}>
        <Controller
          name={`costs.${index}.quantity`}
          control={control}
          render={({ field }) => (
            <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
              {field.value}{" "}
              {selectedConsumable?.unit === EUnit.PIECE ? "unidades" : "%"}
            </Typography>
          )}
        />
      </Grid>

      <Grid size={1}>
        <IconButton onClick={onRemove} sx={{ color: selectedTheme.text_color }}>
          <DeleteIcon sx={{ fontSize: "1.1rem" }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
