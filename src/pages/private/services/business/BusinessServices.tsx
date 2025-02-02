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
import { CustomSnackbar } from "../../../../components/common/ui/CustomSnackbar";
import { LoadingCircularProgress } from "../../../../components/common/ui/LoadingCircularProgress";
import { ModalConfirm } from "../../../../components/common/ui/ModalConfirm";
import { useAppContext } from "../../../../core/context/use/useAppContext";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { formatTextReference } from "../../../../core/utilities/helpers/formatters";
import { ServiceListDesktop } from "./components/ServiceListDesktop";
import { ServiceListMobile } from "./components/ServiceListMobile";
import { ModalAddService } from "./modal-add-service/ModalAddService";
import { useBusinessServices } from "./useBusinessServices";

const BusinessServices = () => {
  const { selectedTheme } = useThemeContext();
  const { materialTheme } = useAppContext();
  const {
    page,
    rowsPerPage,
    openModalAdd,
    openModalConfirmDelete,
    services,
    loading,
    success,
    error,
    consumables,
    serviceToDelete,
    serviceToEdit,
    setOpenModalAdd,
    setOpenModalConfirmDelete,
    handleSubmit,
    deleteService,
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenModal,
    handleEditModal,
    handleDeleteService,
  } = useBusinessServices();

  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));

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
