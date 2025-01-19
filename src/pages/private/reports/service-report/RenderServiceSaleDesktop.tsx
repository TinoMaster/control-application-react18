import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import {
  darken,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { CustomTooltip } from "../../../../components/common/ui/CustomTooltip";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { ServiceSaleModel } from "../../../../core/models/api/serviceSale.model";
import { formatDateToHourString } from "../../../../core/utilities/helpers/dateFormat";

interface Props {
  serviceSales: ServiceSaleModel[];
  allowedToEdit: (userId: number, businessFinalSale: boolean) => boolean;
  allowedToDelete: (businessFinalSale: boolean) => boolean;
  handleEditServiceSale: (serviceSale: ServiceSaleModel) => void;
  handleDeleteServiceSale: (serviceSaleId: number) => void;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RenderServiceSaleDesktop = ({
  serviceSales,
  allowedToEdit,
  allowedToDelete,
  handleEditServiceSale,
  handleDeleteServiceSale,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}: Props) => {
  const { selectedTheme } = useThemeContext();

  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: selectedTheme.background_color }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundImage: `linear-gradient(to right, ${
                selectedTheme.primary_color
              }, ${darken(selectedTheme.primary_color, 0.2)})`,
            }}
          >
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Servicio
            </TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Cantidad
            </TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Realizado por
            </TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Precio Final
            </TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Creado
            </TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Actualizado
            </TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Acciones
            </TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Finalizado
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serviceSales
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((serviceSale) => (
              <TableRow key={serviceSale.id}>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {serviceSale.service.name}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {serviceSale.quantity}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {serviceSale.employee.user.name}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  $ {serviceSale.quantity * serviceSale.service.price}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {serviceSale.createdAt
                    ? formatDateToHourString(serviceSale.createdAt)
                    : "N/A"}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {serviceSale.updatedAt
                    ? formatDateToHourString(serviceSale.updatedAt)
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <CustomTooltip
                    message={
                      allowedToEdit(
                        serviceSale.employee.user.id as number,
                        serviceSale.businessFinalSale !== null
                      )
                        ? "Editar"
                        : "Sin permiso"
                    }
                  >
                    <IconButton
                      disabled={
                        !allowedToEdit(
                          serviceSale.employee.user.id as number,
                          serviceSale.businessFinalSale !== null
                        )
                      }
                      onClick={() => handleEditServiceSale(serviceSale)}
                      sx={{
                        color: selectedTheme.text_color,
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </CustomTooltip>

                  <CustomTooltip
                    message={
                      allowedToDelete(serviceSale.businessFinalSale !== null)
                        ? "Eliminar"
                        : "Sin permiso"
                    }
                  >
                    <IconButton
                      disabled={
                        !allowedToDelete(serviceSale.businessFinalSale !== null)
                      }
                      onClick={() => handleDeleteServiceSale(serviceSale.id!)}
                      sx={{
                        color: selectedTheme.text_color,
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CustomTooltip>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: selectedTheme.text_color,
                    }}
                  >
                    <IconButton
                      disabled={
                        !allowedToEdit(
                          serviceSale.employee.user.id as number,
                          serviceSale.businessFinalSale !== null
                        )
                      }
                      onClick={() => handleEditServiceSale(serviceSale)}
                    >
                      {serviceSale.businessFinalSale ? (
                        <LibraryAddCheckIcon
                          sx={{ color: "green", opacity: 0.9 }}
                        />
                      ) : (
                        <RunningWithErrorsIcon
                          sx={{ color: "red", opacity: 0.8 }}
                        />
                      )}
                    </IconButton>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={serviceSales.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: selectedTheme.text_color,
        }}
      />
    </TableContainer>
  );
};
