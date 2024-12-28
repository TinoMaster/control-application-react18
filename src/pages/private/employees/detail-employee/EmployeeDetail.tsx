import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EmployeeModel } from "../../../../core/models/api/employee.model";
import { employeeService } from "../../../../core/services/employeeService";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid2 as Grid,
  Modal,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { formatDateToString } from "../../../../core/utilities/helpers/dateFormat";
import { translateRole } from "../../../../core/utilities/helpers/translateRole";
import { ERole } from "../../../../core/models/api";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const EmployeeDetail = () => {
  const { selectedTheme } = useThemeContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const [employee, setEmployee] = useState<EmployeeModel | undefined>(
    undefined
  );

  const getEmployee = useCallback(async () => {
    if (!id) {
      return;
    }
    const response = await employeeService.getEmployeeById(id!);
    if (response.status === 200) {
      setEmployee(response.data);
    }
  }, [id]);

  const onDeleteEmployee = async () => {
    setError(false);
    setLoading(true);
    const response = await employeeService.deleteEmployee(id!);
    if (response.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/employees/list";
        setLoading(false);
      }, 1000);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

  return (
    <>
      <Modal sx={modalStyle} open={loading}>
        <>
          {loading && (
            <CircularProgress sx={{ color: "var(--primary-color)" }} />
          )}
        </>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={success || error}
        autoHideDuration={4000}
      >
        <Alert
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {success
            ? "Empleado eliminado con éxito"
            : "Error al eliminar el empleado"}
        </Alert>
      </Snackbar>
      <Card
        sx={{
          margin: "auto",
          boxShadow: `0 0 70px 10px ${selectedTheme.secondary_color}15 , 0 0 5px 2px #00000015`,
          p: 3,
          bgcolor: "white",
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: selectedTheme.background_color,
          color: selectedTheme.text_color,
        }}
      >
        {/* Encabezado */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            bgcolor: "#EFEFEF",
            color: "text.primary",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ fontSize: "1.2rem" }}
          >
            {employee?.user.name}
          </Typography>
          <Box>
            <Button
              onClick={onDeleteEmployee}
              variant="contained"
              color="error"
              size="small"
            >
              Elimina
            </Button>
          </Box>
        </Box>

        {/* Contenido de la tarjeta */}
        <CardContent>
          <Grid container spacing={2} sx={{ py: 2 }}>
            {/* Información básica */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold" }}>Nombre: </span>
                </Box>
                <span>{employee?.user.name}</span>
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold" }}>Dirección: </span>
                </Box>
                <span>{`${employee?.address.street} #${employee?.address.number}, ${employee?.address.city}, ${employee?.address.municipality}`}</span>
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold" }}>Telefono: </span>
                </Box>
                <Typography sx={{ fontSize: "0.9rem" }}>
                  {employee?.phone}
                </Typography>
              </Typography>
            </Grid>
            {/* Otros detalles */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <span style={{ fontWeight: "bold" }}>Cargo: </span>
                <span>{translateRole(employee?.user.role as ERole)}</span>
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <span style={{ fontWeight: "bold" }}>Creado: </span>
                <span>
                  {formatDateToString(employee?.user.createdAt || new Date())}
                </span>
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <span style={{ fontWeight: "bold" }}>Modificado: </span>
                <span>
                  {formatDateToString(employee?.user.updatedAt || new Date())}
                </span>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        {/* Services list */}
        <Typography variant="h6" fontWeight="bold">
          Negocios Asociados
        </Typography>
        <Paper sx={{ mt: 2, borderRadius: "8px", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    "& > *": { backgroundColor: "#efefef", fontSize: "12px" },
                  }}
                >
                  <TableCell>Nombre</TableCell>
                  <TableCell>Dirección</TableCell>
                  <TableCell>Telefono</TableCell>
                  <TableCell>Creado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employee?.user.businesses.map((business, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontSize: "12px" }}>
                      {business.name}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px" }}>
                      {`${business.address.street}, #${business.address.number}, ${business.address.municipality}, ${business.address.city}`}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px" }}>
                      {business.phone}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px" }}>
                      {formatDateToString(business.createdAt || new Date())}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Información adicional */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "end",
            alignItems: "center",
            p: 2,
            bgcolor: "grey.100",
            borderRadius: "8px",
            mt: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <strong>Negocio:</strong> {employee?.dni}
          </Typography>
        </Box>
      </Card>
    </>
  );
};
export default EmployeeDetail;
