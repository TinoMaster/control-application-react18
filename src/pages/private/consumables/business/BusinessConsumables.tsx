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
import { ConsumableModel } from "../../../../core/models/api/consumables.model";
import { ModalAddConsumable } from "./modal-add-consumable/ModalAddConsumable";
import { useAppContext } from "../../../../core/context/use/useAppContext";
import { consumableService } from "../../../../core/services/consumableService";
import { CustomSnackbar } from "../../../../components/common/ui/CustomSnackbar";
import { LoadingCircularProgress } from "../../../../components/common/ui/LoadingCircularProgress";
import { useBusinessContext } from "../../../../core/context/use/useBusinessContext";
import { EUnit, TRANSLATE_UNIT } from "../../../../core/models/api/unit.model";

const BusinessConsumables = () => {
  const { selectedTheme } = useThemeContext();
  const { materialTheme } = useAppContext();
  const { business } = useBusinessContext();

  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));
  // Estado para la paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Estado para el modal (lo implementaremos después)
  const [open, setOpen] = useState(false);
  // Datos de ejemplo (después los traeremos de una API)
  const [consumables, setConsumables] = useState<ConsumableModel[]>([]);
  const [consumableToEdit, setConsumableToEdit] = useState<ConsumableModel>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

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
    if (!business) {
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
    setOpen(true);
  };

  const handleEditModal = (consumable: ConsumableModel) => {
    setOpen(true);
    setConsumableToEdit(consumable);
  };

  const handleDeleteConsumable = async (id: number) => {
    setLoading(true);
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

    const response = await consumableService.saveConsumable(consumable);

    if (response.status === 200) {
      setSuccess(true);
      setOpen(false);
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

  /* Vistas */
  // Vista móvil en forma de tarjetas
  const MobileView = () => (
    <Box sx={{ mt: 2 }}>
      {consumables
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((consumable) => (
          <Card
            key={consumable.id}
            sx={{ mb: 2, backgroundColor: selectedTheme.background_color }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                color={selectedTheme.text_color}
              >
                {consumable.name}
              </Typography>
              <Typography variant="body2" color={selectedTheme.text_color}>
                Descripción: {consumable.description}
              </Typography>
              <Typography variant="body2" color={selectedTheme.text_color}>
                Cantidad: {consumable.stock}{" "}
                {TRANSLATE_UNIT[consumable.unit as EUnit] || consumable.unit}
              </Typography>
              <Typography variant="body2" color={selectedTheme.text_color}>
                Precio: ${consumable.price}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleEditModal(consumable)}
                  sx={{ color: selectedTheme.text_color }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleDeleteConsumable(consumable.id as number)
                  }
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

  // Vista de escritorio en forma de tabla
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
            <TableCell sx={{ color: "#fff" }}>Cantidad</TableCell>
            <TableCell sx={{ color: "#fff" }}>Unidad</TableCell>
            <TableCell sx={{ color: "#fff" }}>Precio</TableCell>
            <TableCell sx={{ color: "#fff" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consumables
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((consumable) => (
              <TableRow key={consumable.id}>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {consumable.name}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {consumable.description}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {consumable.stock}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  {TRANSLATE_UNIT[consumable.unit as EUnit] || consumable.unit}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  ${consumable.price}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEditModal(consumable)}
                    sx={{ color: selectedTheme.text_color }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleDeleteConsumable(consumable.id as number)
                    }
                    sx={{ color: selectedTheme.text_color }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {consumables.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
                sx={{ color: selectedTheme.text_color }}
              >
                No hay insumos registrados
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
        {isMobile ? <MobileView /> : <DesktopView />}

        {/* Paginación */}
        <TablePagination
          component="div"
          count={consumables.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
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

        <ModalAddConsumable
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
          consumable={consumableToEdit}
          isEditing={consumableToEdit !== undefined}
        />
      </Box>
    </>
  );
};

export default BusinessConsumables;
