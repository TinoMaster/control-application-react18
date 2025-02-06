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
import { LoadingTable } from "../../../../../components/common/ui/loaders/loadingTable";
import { useDelayedLoading } from "../../../../../core/hooks/customs/useDelayedLoading";

interface Props {
  services: ServiceModel[];
  handleEditModal: (service: ServiceModel) => void;
  handleDeleteService: (service: ServiceModel) => void;
  page: number;
  rowsPerPage: number;
  loadingServices: boolean;
}

export const ServiceListDesktop = ({
  services,
  handleEditModal,
  handleDeleteService,
  page,
  rowsPerPage,
  loadingServices,
}: Props) => {
  const { selectedTheme } = useThemeContext();
  const {
    headerTableCellStyle,
    bodyTableCellStyle,
    tableContainerStyle,
    bodyTableRowStyle,
  } = useTableStyles();
  const delayedLoading = useDelayedLoading(loadingServices, 1000);

  return (
    <TableContainer sx={tableContainerStyle}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={headerTableCellStyle}>Nombre</TableCell>
            <TableCell sx={headerTableCellStyle}>Descripción</TableCell>
            <TableCell sx={headerTableCellStyle}>Precio</TableCell>
            <TableCell sx={headerTableCellStyle}>Costos</TableCell>
            <TableCell sx={headerTableCellStyle}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {delayedLoading && (
            <TableRow>
              <TableCell colSpan={5}>
                <LoadingTable rows={5} columns={5} />
              </TableCell>
            </TableRow>
          )}
          {!delayedLoading &&
            services.length > 0 &&
            services
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((service) => (
                <TableRow sx={bodyTableRowStyle} key={service.id}>
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
          {!delayedLoading && services.length === 0 && (
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
