import { useState } from "react";
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

const BusinessConsumables = () => {
  const { selectedTheme } = useThemeContext();
  const { materialTheme } = useAppContext();
  const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));
  // Estado para la paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Estado para el modal (lo implementaremos después)
  const [open, setOpen] = useState(false);
  // Datos de ejemplo (después los traeremos de una API)
  const [consumables] = useState<ConsumableModel[]>([]);

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
    setOpen(true);
  };

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
                Cantidad: {consumable.stock} {consumable.unit}
              </Typography>
              <Typography variant="body2" color={selectedTheme.text_color}>
                Precio: ${consumable.price}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                <IconButton
                  size="small"
                  sx={{ color: selectedTheme.text_color }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
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
                  {consumable.unit}
                </TableCell>
                <TableCell sx={{ color: selectedTheme.text_color }}>
                  ${consumable.price}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    sx={{ color: selectedTheme.text_color }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
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
        onSubmit={(consumable) => console.log(consumable)}
      />
    </Box>
  );
};

export default BusinessConsumables;
