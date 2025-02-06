import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Grid2 as Grid,
  TablePagination,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { CustomSnackbar } from "../../../../components/common/ui/CustomSnackbar";
import { ModalConfirm } from "../../../../components/common/ui/ModalConfirm";
import { useAppContext } from "../../../../core/context/use/useAppContext";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { useTableStyles } from "../../../../core/styles/useTableStyles";
import { formatTextReference } from "../../../../core/utilities/helpers/formatters";
import { ServiceListDesktop } from "./components/ServiceListDesktop";
import { ServiceListMobile } from "./components/ServiceListMobile";
import { ModalAddService } from "./modal-add-service/ModalAddService";
import { useBusinessServices } from "./useBusinessServices";

const BusinessServices = () => {
  const { selectedTheme } = useThemeContext();
  const { buttonStyle } = useTableStyles();
  const { materialTheme } = useAppContext();
  const {
    page,
    rowsPerPage,
    openModalAdd,
    openModalConfirmDelete,
    services,
    loading,
    successMessage,
    errorMessage,
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
      <ModalConfirm
        open={openModalConfirmDelete}
        onClose={() => setOpenModalConfirmDelete(false)}
        onConfirm={deleteService}
        title="Confirmar eliminación"
        message={`¿Está seguro que desea eliminar el servicio ${formatTextReference(
          serviceToDelete?.name
        )}?`}
      />
      <ModalAddService
        open={openModalAdd}
        onClose={() => setOpenModalAdd(false)}
        onSubmit={handleSubmit}
        service={serviceToEdit}
        isEditing={serviceToEdit !== undefined}
        consumables={consumables}
      />
      <CustomSnackbar
        successMessage={successMessage}
        errorMessage={errorMessage}
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
              sx={buttonStyle}
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
            loadingServices={loading}
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
      </Box>
    </>
  );
};

export default BusinessServices;
