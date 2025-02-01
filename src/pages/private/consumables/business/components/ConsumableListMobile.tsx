import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { ConsumableModel } from "../../../../../core/models/api/consumables.model";
import {
  EUnit,
  TRANSLATE_UNIT,
} from "../../../../../core/models/api/unit.model";
import { useTableStyles } from "../../../../../core/styles/useTableStyles";

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
  const { cardStyle } = useTableStyles();
  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {consumables
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((consumable) => (
          <Card key={consumable.id} sx={cardStyle}>
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
