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
import { LoadingTable } from "../../../../../components/common/ui/loaders/loadingTable";
import { useDelayedLoading } from "../../../../../core/hooks/customs/useDelayedLoading";

interface Props {
  consumables: ConsumableModel[];
  page: number;
  rowsPerPage: number;
  handleEditModal: (consumable: ConsumableModel) => void;
  handleDeleteConsumable: (consumable: ConsumableModel) => void;
  loadingConsumables: boolean;
}

export const ConsumableListDesktop = ({
  consumables,
  page,
  rowsPerPage,
  handleEditModal,
  handleDeleteConsumable,
  loadingConsumables,
}: Props) => {
  const { selectedTheme } = useThemeContext();
  const {
    headerTableCellStyle,
    bodyTableRowStyle,
    bodyTableCellStyle,
    tableContainerStyle,
    iconButtonStyle,
  } = useTableStyles();
  const delayedLoading = useDelayedLoading(loadingConsumables, 1000);

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
          {delayedLoading && (
            <TableCell colSpan={6}>
              <LoadingTable rows={5} columns={6} />
            </TableCell>
          )}
          {!delayedLoading &&
            consumables.length > 0 &&
            consumables
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((consumable) => (
                <TableRow key={consumable.id} sx={bodyTableRowStyle}>
                  <TableCell sx={bodyTableCellStyle}>
                    {consumable.name}
                  </TableCell>
                  <TableCell sx={bodyTableCellStyle}>
                    {consumable.description}
                  </TableCell>
                  <TableCell sx={bodyTableCellStyle}>
                    {consumable.stock}
                  </TableCell>
                  <TableCell sx={bodyTableCellStyle}>
                    {TRANSLATE_UNIT[consumable.unit as EUnit] ||
                      consumable.unit}
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
          {!delayedLoading && consumables.length === 0 && (
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
