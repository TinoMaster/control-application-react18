import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Typography,
  useMediaQuery,
  Card,
  CardContent,
  Grid2 as Grid,
  darken,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { ServiceModel } from "../../../../core/models/api/service.model";
import { ConsumableModel } from "../../../../core/models/api/consumables.model";
import { ModalAddService } from "./modal-add-service/ModalAddService";
import { useAppContext } from "../../../../core/context/use/useAppContext";
import { CustomSnackbar } from "../../../../components/common/ui/CustomSnackbar";
import { LoadingCircularProgress } from "../../../../components/common/ui/LoadingCircularProgress";
import { useBusinessContext } from "../../../../core/context/use/useBusinessContext";

const BusinessServices = () => {
  const { selectedTheme } = useThemeContext();
  const { materialTheme } = useAppContext();
  const { business } = useBusinessContext();

  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));

  // Estados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [services] = useState<ServiceModel[]>([]);
  const [consumables] = useState<ConsumableModel[]>([]);
  const [serviceToEdit, setServiceToEdit] = useState<ServiceModel>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Funciones de manejo de datos
  /* const addServiceToServices = (service: ServiceModel) => {
    setServices([...services, service]);
  };

  const editServiceFromServices = (service: ServiceModel) => {
    setServices(services.map((s) => (s.id === service.id ? service : s)));
  };

  const deleteServiceFromServices = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
  }; */

  const getServices = useCallback(async () => {
    if (!business?.id) return;

    setLoading(true);
    try {
      // TODO: Implementar el servicio real
      // const response = await serviceService.getServicesByBusinessId(business.id);
      // if (response.status === 200) {
      //   setServices(response.data || []);
      // }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
    }
  }, [business?.id]);

  const getConsumables = useCallback(async () => {
    if (!business?.id) return;

    try {
      // TODO: Implementar el servicio real
      // const response = await consumableService.getConsumablesByBusinessId(business.id);
      // if (response.status === 200) {
      //   setConsumables(response.data || []);
      // }
    } catch (error) {
      console.error("Error fetching consumables:", error);
    }
  }, [business?.id]);

  useEffect(() => {
    getServices();
    getConsumables();
  }, [getServices, getConsumables]);

  // Handlers
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = () => {
    setServiceToEdit(undefined);
    setOpen(true);
  };

  const handleEditModal = (service: ServiceModel) => {
    setOpen(true);
    setServiceToEdit(service);
  };

  const handleDeleteService = async (id: number) => {
    console.log(id);
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      // TODO: Implementar el servicio real
      // const response = await serviceService.deleteService(id);
      // if (response.status === 200) {
      //   setSuccess(true);
      //   deleteServiceFromServices(id);
      // } else {
      //   setError(true);
      // }
    } catch (error) {
      setError(true);
      console.error("Error deleting service:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (service: ServiceModel) => {
    console.log(service);
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      // TODO: Implementar el servicio real
      // const response = await serviceService.saveService(service);
      // if (response.status === 200) {
      //   setSuccess(true);
      //   setOpen(false);
      //   if (serviceToEdit) {
      //     editServiceFromServices(response.data);
      //   } else {
      //     addServiceToServices(response.data);
      //   }
      // } else {
      //   setError(true);
      // }
    } catch (error) {
      setError(true);
      console.error("Error saving service:", error);
    }
    setLoading(false);
  };

  // Vista móvil
  const MobileView = () => (
    <Box sx={{ mt: 2 }}>
      {services
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((service) => (
          <Card
            key={service.id}
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
                {service.name}
              </Typography>
              <Typography variant="body2" color={selectedTheme.text_color}>
                Descripción: {service.description}
              </Typography>
              <Typography variant="body2" color={selectedTheme.text_color}>
                Precio: ${service.price}
              </Typography>
              <Typography variant="body2" color={selectedTheme.text_color}>
                Costos: {service.costs.length}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleEditModal(service)}
                  sx={{ color: selectedTheme.text_color }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteService(service.id)}
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

  // Vista de escritorio
  const DesktopView = () => (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: selectedTheme.background_color }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: selectedTheme.primary_color }}>
            <TableCell sx={{ color: "#fff" }}>Nombre</TableCell>
            <TableCell sx={{ color: "#fff" }}>Descripción</TableCell>
            <TableCell sx={{ color: "#fff" }}>Precio</TableCell>
            <TableCell sx={{ color: "#fff" }}>Costos</TableCell>
            <TableCell sx={{ color: "#fff" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((service) => (
              <TableRow key={service.id}>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {service.name}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {service.description}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  ${service.price}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {service.costs.length}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEditModal(service)}
                    sx={{ color: selectedTheme.text_color }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteService(service.id)}
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

  return (
    <>
      <LoadingCircularProgress loading={loading} />
      <CustomSnackbar
        success={success}
        error={error}
        successMessage="Operación realizada con éxito"
        errorMessage="Error al realizar la operación"
      />
      <Box sx={{ p: 3 }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Grid>
            <Typography
              variant="h5"
              component="h1"
              color={selectedTheme.text_color}
            >
              Servicios del Negocio
            </Typography>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenModal}
              sx={{
                backgroundColor: selectedTheme.primary_color,
                color: "#fff",
                "&:hover": {
                  backgroundColor: darken(selectedTheme.primary_color, 0.3),
                },
              }}
            >
              Agregar Servicio
            </Button>
          </Grid>
        </Grid>

        {isMobile ? <MobileView /> : <DesktopView />}

        <TablePagination
          component="div"
          count={services.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filtrar"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
          sx={{
            color: selectedTheme.text_color,
            ".MuiTablePagination-select": {
              color: selectedTheme.text_color,
            },
            ".MuiTablePagination-selectIcon": {
              color: selectedTheme.text_color,
            },
          }}
        />

        <ModalAddService
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
          service={serviceToEdit}
          isEditing={serviceToEdit !== undefined}
          consumables={consumables}
        />
      </Box>
    </>
  );
};

export default BusinessServices;
