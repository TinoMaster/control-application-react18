import { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BusinessModel } from "../../../../core/models/api";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid2 as Grid,
  Modal,
  Paper,
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
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { KeyValueItem } from "../../../../components/common/ui/KeyValueItem";
import { TitleBarAndButtons } from "../../../../components/common/ui/TitleBarAndButtons";
import { CustomSnackbar } from "../../../../components/common/ui/CustomSnackbar";
import { MachineSection } from "./machine-section/MachineSection";
import { useTableStyles } from "../../../../core/styles/useTableStyles";

const BusinessDetail = () => {
  const { selectedTheme } = useThemeContext();
  const { headerTableCellStyle, bodyTableCellStyle, modalStyle } =
    useTableStyles();

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
        parseInt(id)
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
    <Fragment>
      <Modal sx={modalStyle} open={loading}>
        <>{loading && <CircularProgress color="warning" />}</>
      </Modal>
      <CustomSnackbar
        success={success}
        error={error}
        successMessage="Establecimiento eliminado con éxito"
        errorMessage="Ocurrió un error al eliminar el establecimiento"
      />
      <Card
        sx={{
          margin: "auto",
          boxShadow: `0 0 70px 30px ${selectedTheme.secondary_color}15 , 0 0 5px 2px #00000035`,
          p: 3,
          bgcolor: "white",
          width: "100%",
          maxWidth: "1500px",
          backgroundColor: selectedTheme.background_color,
          color: selectedTheme.text_color,
          borderRadius: "12px",
        }}
      >
        {/* Encabezado */}
        <TitleBarAndButtons
          title={business?.name || ""}
          buttons={[
            { label: "Eliminar", onClick: onDeleteBusiness, color: "error" },
          ]}
        />

        {/* Contenido de la tarjeta */}
        <CardContent>
          <Grid container spacing={2} sx={{ py: 2 }}>
            {/* Información básica */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <KeyValueItem title="Nombre" value={business?.name || ""} />
              <KeyValueItem
                title="Dirección"
                value={`${business?.address.street} #${business?.address.number}, ${business?.address.city}, ${business?.address.municipality}`}
              />
              <KeyValueItem title="Teléfono" value={business?.phone || ""} />
              <KeyValueItem
                title="Creado"
                value={formatDateToString(business?.createdAt || new Date())}
              />
              <KeyValueItem
                title="Actualizado"
                value={formatDateToString(business?.updatedAt || new Date())}
              />
            </Grid>
            {/* Otros detalles */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Box sx={{ width: "50%" }}>
                <Typography variant="body2" fontWeight="bold" sx={{ mb: 2 }}>
                  Maquinas
                </Typography>
                <MachineSection />
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        {/* Services list */}
        <Typography variant="h6" fontWeight="bold">
          Empleados Asociados
        </Typography>
        <Paper sx={{ mt: 2, borderRadius: "8px", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={headerTableCellStyle}>Nombre</TableCell>
                  <TableCell sx={headerTableCellStyle}>Dirección</TableCell>
                  <TableCell sx={headerTableCellStyle}>Teléfono</TableCell>
                  <TableCell sx={headerTableCellStyle}>Correo</TableCell>
                  <TableCell sx={headerTableCellStyle}>Cargo</TableCell>
                  <TableCell sx={headerTableCellStyle}>Creado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {personalList.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell sx={bodyTableCellStyle}>
                      {employee.user.name}
                    </TableCell>
                    <TableCell sx={bodyTableCellStyle}>
                      {`${employee.address.street}, #${employee.address.number}, ${employee.address.municipality}, ${employee.address.city}`}
                    </TableCell>
                    <TableCell sx={bodyTableCellStyle}>
                      {employee.phone}
                    </TableCell>
                    <TableCell sx={bodyTableCellStyle}>
                      {employee.user.email}
                    </TableCell>
                    <TableCell sx={bodyTableCellStyle}>
                      {translateRole(employee.user.role)}
                    </TableCell>
                    <TableCell sx={bodyTableCellStyle}>
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
            bgcolor: selectedTheme.primary_color,
            color: selectedTheme.text_color,
            borderRadius: "8px",
            mt: 2,
          }}
        >
          <Typography variant="body2">
            <strong>Negocio:</strong> {business?.name}
          </Typography>
        </Box>
      </Card>
    </Fragment>
  );
};
export default BusinessDetail;
