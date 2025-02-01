import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { ConsumableModel } from "../../../../../core/models/api/consumables.model";
import {
  EUnit,
  TRANSLATE_UNIT,
} from "../../../../../core/models/api/unit.model";
import { useTableStyles } from "../../../../../core/styles/useTableStyles";
import { formatCurrency } from "../../../../../core/utilities/helpers/formatCurrency";

interface Props {
  consumables: ConsumableModel[];
  page: number;
  rowsPerPage: number;
  handleEditModal: (consumable: ConsumableModel) => void;
  handleDeleteConsumable: (consumable: ConsumableModel) => void;
}

export const ConsumableListDesktop = ({
  consumables,
  page,
  rowsPerPage,
  handleEditModal,
  handleDeleteConsumable,
}: Props) => {
  const { selectedTheme } = useThemeContext();
  const {
    headerTableCellStyle,
    bodyTableCellStyle,
    tableContainerStyle,
    iconButtonStyle,
  } = useTableStyles();

  return (
    <TableContainer sx={tableContainerStyle}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={headerTableCellStyle}>Nombre</TableCell>
            <TableCell sx={headerTableCellStyle}>Descripción</TableCell>
            <TableCell sx={headerTableCellStyle}>Cantidad</TableCell>
            <TableCell sx={headerTableCellStyle}>Unidad</TableCell>
            <TableCell sx={headerTableCellStyle}>Precio aprox. x/u</TableCell>
            <TableCell sx={headerTableCellStyle}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consumables
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((consumable) => (
              <TableRow
                key={consumable.id}
                sx={{
                  "&:hover": {
                    backgroundColor: `${
                      selectedTheme.background_color === "#fff"
                        ? "rgba(0, 0, 0, 0.04)"
                        : "rgba(255, 255, 255, 0.04)"
                    }`,
                  },
                  transition: "background-color 0.2s ease",
                }}
              >
                <TableCell sx={bodyTableCellStyle}>{consumable.name}</TableCell>
                <TableCell sx={bodyTableCellStyle}>
                  {consumable.description}
                </TableCell>
                <TableCell sx={bodyTableCellStyle}>
                  {consumable.stock}
                </TableCell>
                <TableCell sx={bodyTableCellStyle}>
                  {TRANSLATE_UNIT[consumable.unit as EUnit] || consumable.unit}
                </TableCell>
                <TableCell sx={bodyTableCellStyle}>
                  {formatCurrency(consumable.price)}
                </TableCell>
                <TableCell sx={bodyTableCellStyle}>
                  <IconButton
                    size="small"
                    onClick={() => handleEditModal(consumable)}
                    sx={iconButtonStyle}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteConsumable(consumable)}
                    sx={iconButtonStyle}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {consumables.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
                sx={{
                  color: selectedTheme.text_color,
                  padding: "24px 16px",
                  border: "none",
                  fontSize: "0.875rem",
                }}
              >
                No hay insumos registrados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
