import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { ConsumableModel } from "../../../../../core/models/api/consumables.model";
import {
  EUnit,
  TRANSLATE_UNIT,
} from "../../../../../core/models/api/unit.model";

interface Props {
  consumables: ConsumableModel[];
  page: number;
  rowsPerPage: number;
  handleEditModal: (consumable: ConsumableModel) => void;
  handleDeleteConsumable: (consumable: ConsumableModel) => void;
}

export const ConsumableListMobile = ({
  consumables,
  page,
  rowsPerPage,
  handleEditModal,
  handleDeleteConsumable,
}: Props) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Box sx={{ mt: 2 }}>
      {consumables
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((consumable) => (
          <Card
            key={consumable.id}
            sx={{
              mb: 2,
              backgroundColor: selectedTheme.background_color,
              boxShadow: `0 0 70px 10px ${selectedTheme.primary_color}15 , 0 0 5px 2px #00000015`,
              borderRadius: "8px",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                color={selectedTheme.text_color}
              >
                {consumable.name}
              </Typography>
              <Typography variant="body2" color={selectedTheme.text_color}>
                Descripción: {consumable.description}
              </Typography>
              <Typography variant="body2" color={selectedTheme.text_color}>
                Cantidad: {consumable.stock}{" "}
                {TRANSLATE_UNIT[consumable.unit as EUnit] || consumable.unit}
              </Typography>
              <Typography variant="body2" color={selectedTheme.text_color}>
                Precio: ${consumable.price}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleEditModal(consumable)}
                  sx={{ color: selectedTheme.text_color }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteConsumable(consumable)}
                  sx={{ color: selectedTheme.text_color }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
    </Box>
  );
};
