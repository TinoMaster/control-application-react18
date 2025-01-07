import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
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
  useMediaQuery,
  Card,
  CardContent,
  Grid2 as Grid,
  darken,
  Tooltip,
  Popover,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { useAppContext } from "../../../../core/context/use/useAppContext";
import { useBusinessContext } from "../../../../core/context/use/useBusinessContext";
import { ServiceSaleModel } from "../../../../core/models/api/serviceSale.model";
import { ServiceModel } from "../../../../core/models/api/service.model";
import { ModalAddServiceSale } from "./modal-add-service-sale/ModalAddServiceSale";
import { CustomSnackbar } from "../../../../components/common/ui/CustomSnackbar";
import { LoadingCircularProgress } from "../../../../components/common/ui/LoadingCircularProgress";
import { serviceService } from "../../../../core/services/serviceService";
import { serviceSaleService } from "../../../../core/services/serviceSaleService";
import { ByBusinessAndDateRequestModel } from "../../../../core/models/api/requests/byBusinessAndDateRequest.model";
import { ERole } from "../../../../core/models/api";

const ServiceReport = () => {
  const { selectedTheme } = useThemeContext();
  const { materialTheme, role } = useAppContext();
  const { business } = useBusinessContext();

  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));

  // Estados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [serviceSales, setServiceSales] = useState<ServiceSaleModel[]>([]);
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [serviceSaleToEdit, setServiceSaleToEdit] =
    useState<ServiceSaleModel>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Funciones de manejo de datos
  const addServiceSaleToServiceSales = (serviceSale: ServiceSaleModel) => {
    setServiceSales([...serviceSales, serviceSale]);
  };

  const editServiceSaleFromServiceSales = (serviceSale: ServiceSaleModel) => {
    setServiceSales(
      serviceSales.map((s) => (s.id === serviceSale.id ? serviceSale : s))
    );
  };

  const deleteServiceSaleFromServiceSales = (id: number) => {
    setServiceSales(serviceSales.filter((s) => s.id !== id));
  };

  const getServiceSales = useCallback(async () => {
    if (!business?.id) return;

    const requestType: ByBusinessAndDateRequestModel = {
      businessId: business.id,
      startDate: new Date(),
      endDate: new Date(),
    };

    setLoading(true);
    try {
      const response =
        await serviceSaleService.getServiceSalesByBusinessIdAndDate(
          requestType
        );
      console.log(response);
      if (response.status === 200) {
        setServiceSales(response.data || []);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching service sales:", error);
      setLoading(false);
    }
  }, [business?.id]);

  const getServices = useCallback(async () => {
    if (!business?.id) return;

    try {
      const response = await serviceService.getServicesByBusinessId(
        business.id
      );
      if (response.status === 200) {
        setServices(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }, [business?.id]);

  useEffect(() => {
    getServiceSales();
    getServices();
  }, [getServiceSales, getServices]);

  // Handlers
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = async (serviceSale: ServiceSaleModel) => {
    try {
      if (!business?.id) return;

      const serviceData = {
        ...serviceSale,
        businessId: business.id,
      };

      let response;
      if (serviceSaleToEdit) {
        response = await serviceSaleService.saveServiceSale(serviceData);
        if (response.status === 200) {
          editServiceSaleFromServiceSales(response.data as ServiceSaleModel);
          setSuccess(true);
        }
      } else {
        response = await serviceSaleService.saveServiceSale(serviceData);
        if (response.status === 200) {
          addServiceSaleToServiceSales(response.data as ServiceSaleModel);
          setSuccess(true);
        }
      }

      setOpen(false);
      setServiceSaleToEdit(undefined);
    } catch (error) {
      console.error("Error submitting service sale:", error);
      setError(true);
    }
  };

  const handleEditServiceSale = (serviceSale: ServiceSaleModel) => {
    setServiceSaleToEdit(serviceSale);
    setOpen(true);
  };

  const handleDeleteServiceSale = async (id: number) => {
    try {
      const response = await serviceSaleService.deleteServiceSale(id);
      if (response.status === 200) {
        deleteServiceSaleFromServiceSales(id);
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error deleting service sale:", error);
      setError(true);
    }
  };

  if (loading) {
    return <LoadingCircularProgress loading={loading} />;
  }

  // Vista de escritorio
  const DesktopView = () => (
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
                color: selectedTheme.text_color,
              }}
            >
              Servicio
            </TableCell>
            <TableCell
              sx={{
                color: selectedTheme.text_color,
              }}
            >
              Cantidad
            </TableCell>
            <TableCell
              sx={{
                color: selectedTheme.text_color,
              }}
            >
              Realizado por
            </TableCell>
            <TableCell
              sx={{
                color: selectedTheme.text_color,
              }}
            >
              Precio Final
            </TableCell>
            <TableCell
              sx={{
                color: selectedTheme.text_color,
              }}
            >
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serviceSales
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((serviceSale) => (
              <TableRow key={serviceSale.id}>
                <TableCell>{serviceSale.service.name}</TableCell>
                <TableCell>{serviceSale.quantity}</TableCell>
                <TableCell>{serviceSale.employee.user.name}</TableCell>
                <TableCell>${serviceSale.businessFinalSale}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEditServiceSale(serviceSale)}
                    sx={{
                      color: selectedTheme.text_color,
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteServiceSale(serviceSale.id!)}
                    sx={{
                      color: selectedTheme.text_color,
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
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

  // Vista móvil
  const MobileView = () => (
    <Box>
      {serviceSales
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((serviceSale) => (
          <Card
            key={serviceSale.id}
            sx={{
              mb: 2,
              backgroundColor: selectedTheme.background_color,
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: selectedTheme.text_color,
                    }}
                  >
                    {serviceSale.service.name}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography
                    sx={{
                      color: selectedTheme.text_color,
                    }}
                  >
                    Cantidad: {serviceSale.quantity}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography
                    sx={{
                      color: selectedTheme.text_color,
                    }}
                  >
                    Realizado por: {serviceSale.employee.user.name}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography
                    sx={{
                      color: selectedTheme.text_color,
                    }}
                  >
                    Precio Final: ${serviceSale.businessFinalSale}
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 1,
                    }}
                  >
                    <IconButton
                      onClick={() => handleEditServiceSale(serviceSale)}
                      sx={{
                        color: selectedTheme.text_color,
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteServiceSale(serviceSale.id!)}
                      sx={{
                        color: selectedTheme.text_color,
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
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
    </Box>
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: selectedTheme.text_color,
          }}
        >
          Reporte de Servicios
        </Typography>
        {isMobile ? (
          <>
            <div
              onClick={(event) => {
                if (role !== ERole.EMPLOYEE && role !== ERole.ADMIN) {
                  setAnchorEl(event.currentTarget);
                } else {
                  setServiceSaleToEdit(undefined);
                  setOpen(true);
                }
              }}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                disabled={role !== ERole.EMPLOYEE && role !== ERole.ADMIN}
                sx={{
                  backgroundColor: selectedTheme.primary_color,
                  color: selectedTheme.text_color,
                  "&:hover": {
                    backgroundColor: darken(selectedTheme.primary_color, 0.1),
                  },
                }}
              >
                Agregar Servicio Vendido
              </Button>
            </div>

            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Box
                sx={{ p: 2, backgroundColor: selectedTheme.background_color }}
              >
                <Typography sx={{ color: selectedTheme.text_color }}>
                  Solo los empleados pueden agregar servicios vendidos
                </Typography>
              </Box>
            </Popover>
          </>
        ) : (
          <Tooltip
            title={
              role !== ERole.EMPLOYEE && role !== ERole.ADMIN
                ? "Solo los empleados pueden agregar servicios vendidos"
                : ""
            }
          >
            <div style={{ display: "inline-block" }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                disabled={role !== ERole.EMPLOYEE && role !== ERole.ADMIN}
                onClick={() => {
                  setServiceSaleToEdit(undefined);
                  setOpen(true);
                }}
                sx={{
                  backgroundColor: selectedTheme.primary_color,
                  color: selectedTheme.text_color,
                  "&:hover": {
                    backgroundColor: darken(selectedTheme.primary_color, 0.1),
                  },
                }}
              >
                Agregar Servicio Vendido
              </Button>
            </div>
          </Tooltip>
        )}
      </Box>

      {isMobile ? <MobileView /> : <DesktopView />}

      <ModalAddServiceSale
        open={open}
        onClose={() => {
          setOpen(false);
          setServiceSaleToEdit(undefined);
        }}
        onSubmit={handleSubmit}
        serviceSale={serviceSaleToEdit}
        isEditing={!!serviceSaleToEdit}
        services={services}
      />

      <CustomSnackbar
        success={success}
        error={error}
        successMessage="Operación exitosa"
        errorMessage="Error al procesar la operación"
      />
    </Box>
  );
};

export default ServiceReport;
