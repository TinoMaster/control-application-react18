import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BusinessModel } from "../../../../core/models/api";
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
import { EmployeeModel } from "../../../../core/models/api/employee.model";
import { businessService } from "../../../../core/services/businessService";
import { employeeService } from "../../../../core/services/employeeService";
import { translateRole } from "../../../../core/utilities/helpers/translateRole";

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const BusinessDetail = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const [business, setBusiness] = useState<BusinessModel | undefined>(
    undefined
  );
  const [personalList, setPersonalList] = useState<EmployeeModel[]>([]);

  const getBusiness = useCallback(async () => {
    if (!id) {
      return;
    }
    const response = await businessService.getBusinessById(id!);
    if (response.status === 200) {
      setBusiness(response.data);

      const employeesResponse = await employeeService.getEmployeesByBusinessId(
        id!
      );

      if (employeesResponse.status === 200) {
        setPersonalList(employeesResponse.data || []);
      }
    }
  }, [id]);

  const onDeleteBusiness = async () => {
    setError(false);
    setLoading(true);
    const response = await businessService.deleteBusiness(id!);

    if (response.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/businesses/list";
        setLoading(false);
      }, 2000);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusiness();
  }, [getBusiness]);

  return (
    <>
      <Modal sx={modalStyle} open={loading}>
        <>{loading && <CircularProgress color="warning" />}</>
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
            ? "Negocio eliminado con éxito"
            : "Error al eliminar el negocio"}
        </Alert>
      </Snackbar>
      <Card
        sx={{
          margin: "auto",
          boxShadow: 3,
          p: 3,
          bgcolor: "white",
          width: "100%",
          maxWidth: "1200px",
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
            {business?.name}
          </Typography>
          <Box>
            <Button
              onClick={onDeleteBusiness}
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
                <span>{business?.name}</span>
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold" }}>Dirección: </span>
                </Box>
                <span>{`${business?.address.street} #${business?.address.number}, ${business?.address.city}, ${business?.address.municipality}`}</span>
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold" }}>Telefono: </span>
                </Box>
                <Typography sx={{ fontSize: "0.9rem" }}>
                  {business?.phone}
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
                <span style={{ fontWeight: "bold" }}>Creado: </span>
                <span>
                  {formatDateToString(business?.createdAt || new Date())}
                </span>
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <span style={{ fontWeight: "bold" }}>Modificado: </span>
                <span>
                  {formatDateToString(business?.updatedAt || new Date())}
                </span>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        {/* Services list */}
        <Typography variant="h6" fontWeight="bold">
          Negocios Asociados
        </Typography>
        <Paper>
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
                  <TableCell>Correo</TableCell>
                  <TableCell>Cargo</TableCell>
                  <TableCell>Creado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {personalList.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontSize: "12px" }}>
                      {employee.user.name}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px" }}>
                      {`${employee.address.street}, #${employee.address.number}, ${employee.address.municipality}, ${employee.address.city}`}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px" }}>
                      {employee.phone}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px" }}>
                      {employee.user.email}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px" }}>
                      {translateRole(employee.user.role)}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px" }}>
                      {formatDateToString(
                        employee.user.createdAt || new Date()
                      )}
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
            <strong>Negocio:</strong> {business?.name}
          </Typography>
        </Box>
      </Card>
    </>
  );
};
export default BusinessDetail;
