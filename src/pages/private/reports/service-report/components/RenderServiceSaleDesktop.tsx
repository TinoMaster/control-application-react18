import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ServiceSaleModel } from "../../../../../core/models/api/serviceSale.model";
import { useTableStyles } from "../../../../../core/styles/useTableStyles";
import { formatDateToHourString } from "../../../../../core/utilities/helpers/dateFormat";
import { CustomTooltip } from "../../../../../components/common/ui/CustomTooltip";
import { useDelayedLoading } from "../../../../../core/hooks/customs/useDelayedLoading";
import { LoadingTable } from "../../../../../components/common/ui/loaders/loadingTable";

interface Props {
  serviceSales: ServiceSaleModel[] | undefined;
  allowedToEdit: (userId: number, businessFinalSale: boolean) => boolean;
  allowedToDelete: (businessFinalSale: boolean) => boolean;
  handleEditServiceSale: (serviceSale: ServiceSaleModel) => void;
  handleDeleteServiceSale: (serviceSaleId: number) => void;
  page: number;
  rowsPerPage: number;
  loadingServiceSales: boolean;
}

export const RenderServiceSaleDesktop = ({
  serviceSales,
  allowedToEdit,
  allowedToDelete,
  handleEditServiceSale,
  handleDeleteServiceSale,
  page,
  rowsPerPage,
  loadingServiceSales,
}: Props) => {
  const {
    bodyTableRowStyle,
    bodyTableCellStyle,
    headerTableCellStyle,
    tableContainerStyle,
    iconButtonStyle,
    emptyInfoStyle,
  } = useTableStyles();

  const loadingDelayed = useDelayedLoading(loadingServiceSales, 1000);

  return (
    <TableContainer sx={tableContainerStyle}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={headerTableCellStyle}>Servicio</TableCell>
            <TableCell sx={headerTableCellStyle}>Cantidad</TableCell>
            <TableCell sx={headerTableCellStyle}>Realizado por</TableCell>
            <TableCell sx={headerTableCellStyle}>Precio Final</TableCell>
            <TableCell sx={headerTableCellStyle}>Creado</TableCell>
            <TableCell sx={headerTableCellStyle}>Actualizado</TableCell>
            <TableCell sx={headerTableCellStyle}>Acciones</TableCell>
            <TableCell sx={headerTableCellStyle}>Procesado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loadingDelayed && (
            <TableRow>
              <TableCell colSpan={8}>
                <LoadingTable rows={5} columns={8} />
              </TableCell>
            </TableRow>
          )}
          {!loadingDelayed &&
            serviceSales &&
            serviceSales.length > 0 &&
            serviceSales
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((serviceSale) => (
                <TableRow style={bodyTableRowStyle} key={serviceSale.id}>
                  <TableCell sx={bodyTableCellStyle}>
                    {serviceSale.service.name}
                  </TableCell>
                  <TableCell sx={bodyTableCellStyle}>
                    {serviceSale.quantity}
                  </TableCell>
                  <TableCell sx={bodyTableCellStyle}>
                    {serviceSale.employee.user.name}
                  </TableCell>
                  <TableCell sx={bodyTableCellStyle}>
                    $ {serviceSale.quantity * serviceSale.service.price}
                  </TableCell>
                  <TableCell sx={bodyTableCellStyle}>
                    {serviceSale.createdAt
                      ? formatDateToHourString(serviceSale.createdAt)
                      : "N/A"}
                  </TableCell>
                  <TableCell sx={bodyTableCellStyle}>
                    {serviceSale.updatedAt
                      ? formatDateToHourString(serviceSale.updatedAt)
                      : "N/A"}
                  </TableCell>
                  <TableCell sx={bodyTableCellStyle}>
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
                        size="small"
                        sx={iconButtonStyle}
                      >
                        <EditIcon sx={{ fontSize: "1.2rem" }} />
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
                          !allowedToDelete(
                            serviceSale.businessFinalSale !== null
                          )
                        }
                        onClick={() => handleDeleteServiceSale(serviceSale.id!)}
                        size="small"
                        sx={iconButtonStyle}
                      >
                        <DeleteIcon sx={{ fontSize: "1.2rem" }} />
                      </IconButton>
                    </CustomTooltip>
                  </TableCell>
                  <TableCell sx={bodyTableCellStyle}>
                    <CustomTooltip
                      message={
                        serviceSale.businessFinalSale
                          ? "Procesado en una venta"
                          : "Sin procesar en una venta"
                      }
                    >
                      <IconButton
                        disabled={
                          !allowedToEdit(
                            serviceSale.employee.user.id as number,
                            serviceSale.businessFinalSale !== null
                          )
                        }
                        sx={iconButtonStyle}
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
                    </CustomTooltip>
                  </TableCell>
                </TableRow>
              ))}

          {!loadingDelayed && serviceSales && serviceSales.length === 0 && (
            <TableRow>
              <TableCell colSpan={8}>
                <Typography sx={emptyInfoStyle}>
                  No hay servicios vendidos hoy
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
