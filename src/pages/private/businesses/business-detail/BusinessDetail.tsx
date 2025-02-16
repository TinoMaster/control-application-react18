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
import { Fragment } from "react";
import { CustomSnackbar } from "../../../../components/common/ui/CustomSnackbar";
import { KeyValueItem } from "../../../../components/common/ui/KeyValueItem";
import { TitleBarAndButtons } from "../../../../components/common/ui/TitleBarAndButtons";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { useTableStyles } from "../../../../core/styles/useTableStyles";
import { formatDateToString } from "../../../../core/utilities/helpers/dateFormat";
import { translateRole } from "../../../../core/utilities/helpers/translateRole";
import { MachineSection } from "./machine-section/MachineSection";
import { useBusinessDetail } from "./useBusinessDetail";

const BusinessDetail = () => {
  const { selectedTheme } = useThemeContext();
  const { headerTableCellStyle, bodyTableCellStyle, modalStyle, cardStyle } =
    useTableStyles();
  const { loading, success, error, business, personalList, onDeleteBusiness } =
    useBusinessDetail();

  return (
    <Fragment>
      <Modal sx={modalStyle} open={loading}>
        <>{loading && <CircularProgress color="warning" />}</>
      </Modal>
      <CustomSnackbar
        successMessage={success ? "Establecimiento eliminado con éxito" : ""}
        errorMessage={
          error ? "Ocurrió un error al eliminar el establecimiento" : ""
        }
      />
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 300px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            ...cardStyle,
            margin: "auto",
            p: 3,
            width: "100%",
            maxWidth: "1200px",
            color: selectedTheme.text_color,
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
      </Box>
    </Fragment>
  );
};
export default BusinessDetail;
