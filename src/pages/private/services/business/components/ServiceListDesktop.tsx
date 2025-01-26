import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useThemeContext } from "../../../../../core/context/use/useThemeContext";
import { ServiceModel } from "../../../../../core/models/api";

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

  const headerTableCellStyle = {
    color: "#fff",
    padding: "12px 16px",
    border: "none",
    fontSize: "0.875rem",
    fontWeight: 600,
  };

  const bodyTableCellStyle = {
    color: selectedTheme.text_color,
    padding: "12px 16px",
    border: "none",
  };
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: selectedTheme.background_color,
        borderRadius: "5px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
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
                <TableCell sx={bodyTableCellStyle}>${service.price}</TableCell>
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
