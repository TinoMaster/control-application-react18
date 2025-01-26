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
import { consumableService } from "../../../../core/services/consumableService";
import { ConsumableListDesktop } from "./components/ConsumableListDesktop";
import { ConsumableListMobile } from "./components/ConsumableListMobile";
import { ModalAddConsumable } from "./modal-add-consumable/ModalAddConsumable";
import { ModalConfirm } from "../../../../components/common/ui/ModalConfirm";
import { formatTextReference } from "../../../../core/utilities/helpers/formatters";

const BusinessConsumables = () => {
  const { selectedTheme } = useThemeContext();
  const { materialTheme } = useAppContext();
  const { business } = useBusinessContext();

  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false);
  const [consumables, setConsumables] = useState<ConsumableModel[]>([]);
  const [consumableToEdit, setConsumableToEdit] = useState<ConsumableModel>();
  const [consumableToDelete, setConsumableToDelete] =
    useState<ConsumableModel>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  // Estado para la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const addConsumableToConsumables = (consumable: ConsumableModel) => {
    setConsumables([...consumables, consumable]);
  };

  const editConsumableFromConsumables = (consumable: ConsumableModel) => {
    setConsumables(
      consumables.map((c) => (c.id === consumable.id ? consumable : c))
    );
  };

  const deleteConsumableFromConsumables = (id: number) => {
    setConsumables(consumables.filter((c) => c.id !== id));
  };

  const getConsumables = useCallback(async () => {
    if (!business || !business.id) {
      return;
    }
    const response = await consumableService.getConsumablesByBusinessId(
      business.id as number
    );
    if (response.status === 200) {
      setConsumables(response.data || []);
    }
  }, [business]);

  useEffect(() => {
    getConsumables();
  }, [getConsumables]);

  /* handlers */
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
    setConsumableToEdit(undefined);
    setOpenModalAdd(true);
  };

  const handleEditModal = (consumable: ConsumableModel) => {
    setOpenModalAdd(true);
    setConsumableToEdit(consumable);
  };

  const handleDeleteConsumable = (consumable: ConsumableModel) => {
    setConsumableToDelete(consumable);
    setOpenModalConfirmDelete(true);
  };

  const deleteConsumable = async () => {
    setLoading(true);
    if (!consumableToDelete || !consumableToDelete.id) return;
    const id = consumableToDelete?.id;

    setError(false);
    setSuccess(false);

    const response = await consumableService.deleteConsumable(id);

    if (response.status === 200) {
      setSuccess(true);
      deleteConsumableFromConsumables(id);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const handleSubmit = async (consumable: ConsumableModel) => {
    setLoading(true);
    setError(false);
    setSuccess(false);

    const consumableToSave: ConsumableModel = {
      ...consumable,
      price: parseFloat((consumable.price / consumable.stock).toFixed(2)),
    };

    const response = await consumableService.saveConsumable(consumableToSave);

    if (response.status === 200) {
      setSuccess(true);
      setOpenModalAdd(false);
      if (consumableToEdit) {
        editConsumableFromConsumables(response.data as ConsumableModel);
      } else {
        addConsumableToConsumables(response.data as ConsumableModel);
      }
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <>
      <LoadingCircularProgress loading={loading} />
      <ModalConfirm
        open={openModalConfirmDelete}
        onClose={() => setOpenModalConfirmDelete(false)}
        onConfirm={deleteConsumable}
        title="Eliminar consumible"
        message={`¿Esta seguro que desea eliminar el insumo ${formatTextReference(
          consumableToDelete?.name
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
              Insumos del Negocio
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

        <ModalAddConsumable
          open={openModalAdd}
          onClose={() => setOpenModalAdd(false)}
          onSubmit={handleSubmit}
          consumable={consumableToEdit}
          isEditing={consumableToEdit !== undefined}
        />
      </Box>
    </>
  );
};

export default BusinessConsumables;
