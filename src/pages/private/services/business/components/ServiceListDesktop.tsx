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
import { ServiceModel } from "../../../../../core/models/api";
import { useTableStyles } from "../../../../../core/styles/useTableStyles";
import { formatCurrency } from "../../../../../core/utilities/helpers/formatCurrency";

interface Props {
  services: ServiceModel[];
  handleEditModal: (service: ServiceModel) => void;
  handleDeleteService: (service: ServiceModel) => void;
  page: number;
  rowsPerPage: number;
}

export const ServiceListDesktop = ({
  services,
  handleEditModal,
  handleDeleteService,
  page,
  rowsPerPage,
}: Props) => {
  const { selectedTheme } = useThemeContext();
  const { headerTableCellStyle, bodyTableCellStyle, tableContainerStyle } =
    useTableStyles();

  return (
    <TableContainer sx={tableContainerStyle}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: selectedTheme.primary_color }}>
            <TableCell sx={headerTableCellStyle}>Nombre</TableCell>
            <TableCell sx={headerTableCellStyle}>Descripción</TableCell>
            <TableCell sx={headerTableCellStyle}>Precio</TableCell>
            <TableCell sx={headerTableCellStyle}>Costos</TableCell>
            <TableCell sx={headerTableCellStyle}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((service) => (
              <TableRow key={service.id}>
                <TableCell sx={bodyTableCellStyle}>{service.name}</TableCell>
                <TableCell sx={bodyTableCellStyle}>
                  {service.description}
                </TableCell>
                <TableCell sx={bodyTableCellStyle}>
                  {formatCurrency(service.price)}
                </TableCell>
                <TableCell sx={bodyTableCellStyle}>
                  {service.costs.length}
                </TableCell>
                <TableCell sx={bodyTableCellStyle}>
                  <IconButton
                    size="small"
                    onClick={() => handleEditModal(service)}
                    sx={{ color: selectedTheme.text_color }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteService(service)}
                    sx={{ color: selectedTheme.text_color }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {services.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                align="center"
                sx={{ color: selectedTheme.text_color }}
              >
                No hay servicios registrados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
