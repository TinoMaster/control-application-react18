import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Grid2 as Grid,
  TablePagination,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ModalConfirm } from "../../../../components/common/ui/ModalConfirm";
import { useAppContext } from "../../../../core/context/use/useAppContext";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { useTableStyles } from "../../../../core/styles/useTableStyles";
import { formatTextReference } from "../../../../core/utilities/helpers/formatters";
import { ConsumableListDesktop } from "./components/ConsumableListDesktop";
import { ConsumableListMobile } from "./components/ConsumableListMobile";
import { ModalAddConsumable } from "./modal-add-consumable/ModalAddConsumable";
import { useBusinessConsumables } from "./useBusinessConsumables";

const BusinessConsumables = () => {
  const { selectedTheme } = useThemeContext();
  const { materialTheme } = useAppContext();
  const { buttonStyle } = useTableStyles();

  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));

  const {
    loading,
    openModalAdd,
    consumableToDelete,
    consumableToEdit,
    setOpenModalAdd,
    openModalConfirmDelete,
    setOpenModalConfirmDelete,
    consumables,
    handleOpenModal,
    handleEditModal,
    handleDeleteConsumable,
    handleSubmit,
    handleChangePage,
    handleChangeRowsPerPage,
    deleteConsumable,
    page,
    rowsPerPage,
  } = useBusinessConsumables();

  return (
    <>
      <ModalConfirm
        open={openModalConfirmDelete}
        onClose={() => setOpenModalConfirmDelete(false)}
        onConfirm={deleteConsumable}
        title="Eliminar consumible"
        message={`¿Esta seguro que desea eliminar el insumo ${formatTextReference(
          consumableToDelete?.name
        )}?`}
      />
      <ModalAddConsumable
        open={openModalAdd}
        onClose={() => setOpenModalAdd(false)}
        onSubmit={handleSubmit}
        consumable={consumableToEdit}
        isEditing={consumableToEdit !== undefined}
      />

      <Box sx={{ p: 1 }}>
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
              component="h2"
              color={selectedTheme.text_color}
            >
              Insumos del Negocio
            </Typography>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenModal}
              sx={buttonStyle}
            >
              Agregar Insumo
            </Button>
          </Grid>
        </Grid>

        {/* Vista condicional basada en el tamaño de la pantalla */}
        {isMobile ? (
          <ConsumableListMobile
            consumables={consumables}
            handleDeleteConsumable={handleDeleteConsumable}
            handleEditModal={handleEditModal}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        ) : (
          <ConsumableListDesktop
            consumables={consumables}
            handleDeleteConsumable={handleDeleteConsumable}
            handleEditModal={handleEditModal}
            page={page}
            rowsPerPage={rowsPerPage}
            loadingConsumables={loading}
          />
        )}

        {/* Pagination */}
        {consumables.length > rowsPerPage && (
          <TablePagination
            component="div"
            count={consumables.length}
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

export default BusinessConsumables;
