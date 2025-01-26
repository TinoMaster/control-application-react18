import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Grid2 as Grid,
  TablePagination,
  Typography,
  darken,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CustomSnackbar } from "../../../../components/common/ui/CustomSnackbar";
import { LoadingCircularProgress } from "../../../../components/common/ui/LoadingCircularProgress";
import { useAppContext } from "../../../../core/context/use/useAppContext";
import { useBusinessContext } from "../../../../core/context/use/useBusinessContext";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { ConsumableModel } from "../../../../core/models/api/consumables.model";
import { ServiceModel } from "../../../../core/models/api/service.model";
import { consumableService } from "../../../../core/services/consumableService";
import { serviceService } from "../../../../core/services/serviceService";
import { ServiceListDesktop } from "./components/ServiceListDesktop";
import { ServiceListMobile } from "./components/ServiceListMobile";
import { ModalAddService } from "./modal-add-service/ModalAddService";
import { ModalConfirm } from "../../../../components/common/ui/ModalConfirm";
import { formatTextReference } from "../../../../core/utilities/helpers/formatters";

const BusinessServices = () => {
  const { selectedTheme } = useThemeContext();
  const { materialTheme } = useAppContext();
  const { business } = useBusinessContext();

  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));

  // Estados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false);
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [consumables, setConsumables] = useState<ConsumableModel[]>([]);
  const [serviceToEdit, setServiceToEdit] = useState<ServiceModel>();
  const [serviceToDelete, setServiceToDelete] = useState<ServiceModel>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Funciones de manejo de datos
  const addServiceToServices = (service: ServiceModel) => {
    setServices([...services, service]);
  };

  const editServiceFromServices = (service: ServiceModel) => {
    setServices(services.map((s) => (s.id === service.id ? service : s)));
  };

  const deleteServiceFromServices = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const getServices = useCallback(async () => {
    if (!business?.id) return;

    setLoading(true);
    try {
      const response = await serviceService.getServicesByBusinessId(
        business.id
      );
      if (response.status === 200) {
        setServices(response.data || []);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
    }
  }, [business?.id]);

  const getConsumables = useCallback(async () => {
    if (!business?.id) return;

    const response = await consumableService.getConsumablesByBusinessId(
      business.id
    );

    if (response.status === 200) {
      setConsumables(response.data || []);
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
    setOpenModalAdd(true);
  };

  const handleEditModal = (service: ServiceModel) => {
    setOpenModalAdd(true);
    setServiceToEdit(service);
  };

  const handleDeleteService = (service: ServiceModel) => {
    setOpenModalConfirmDelete(true);
    setServiceToDelete(service);
  };

  const deleteService = async () => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    if (!serviceToDelete?.id) return;
    const id = serviceToDelete?.id;

    try {
      const response = await serviceService.deleteService(id);
      if (response.status === 200) {
        setSuccess(true);
        deleteServiceFromServices(id);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.error("Error deleting service:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (service: ServiceModel) => {
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const response = await serviceService.saveService(service);
      if (response.status === 200) {
        setSuccess(true);
        setOpenModalAdd(false);
        if (serviceToEdit) {
          editServiceFromServices(response.data as ServiceModel);
        } else {
          addServiceToServices(response.data as ServiceModel);
        }
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.error("Error saving service:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <LoadingCircularProgress loading={loading} />
      <ModalConfirm
        open={openModalConfirmDelete}
        onClose={() => setOpenModalConfirmDelete(false)}
        onConfirm={deleteService}
        title="Confirmar eliminación"
        message={`¿Está seguro que desea eliminar el servicio ${formatTextReference(
          serviceToDelete?.name
        )}?`}
      />
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

        {isMobile ? (
          <ServiceListMobile
            services={services}
            handleDeleteService={handleDeleteService}
            handleEditModal={handleEditModal}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        ) : (
          <ServiceListDesktop
            services={services}
            handleDeleteService={handleDeleteService}
            handleEditModal={handleEditModal}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        )}

        {services.length > rowsPerPage && (
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
        )}

        <ModalAddService
          open={openModalAdd}
          onClose={() => setOpenModalAdd(false)}
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
