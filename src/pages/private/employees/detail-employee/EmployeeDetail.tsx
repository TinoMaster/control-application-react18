import {
  Alert,
  Box,
  Card,
  CircularProgress,
  Modal,
  Snackbar,
} from "@mui/material";
import { EmployeeModel } from "../../../../core/models/api/employee.model";
import { useTableStyles } from "../../../../core/styles/useTableStyles";
import { EmployeeDetailAssociatedBusinesses } from "./associatedBusinesses-section/EmployeeDetailAssociatedBusinesses";
import { EmployeeDetailDescriptionSection } from "./description-section/EmployeeDetailDescriptionSection";
import { EmployeeDetailHeaderSection } from "./header-section/EmployeeDetailHeaderSection";
import { EmployeeDetailSalarySection } from "./salary-section/EmployeeDetailSalarySection";
import { useEmployeeDetail } from "./useEmployeeDetail";

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const EmployeeDetail = () => {
  const { cardStyle } = useTableStyles();
  const {
    loading,
    success,
    error,
    employee,
    updateEmployee,
    onDeleteEmployee,
  } = useEmployeeDetail();

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
            width: "100%",
            maxWidth: "1200px",
            p: 3,
          }}
        >
          {/* Encabezado */}
          <EmployeeDetailHeaderSection
            onDeleteEmployee={onDeleteEmployee}
            employee={employee as EmployeeModel}
            updateEmployee={updateEmployee}
          />

          {/* Contenido de la tarjeta */}
          <EmployeeDetailDescriptionSection
            employee={employee as EmployeeModel}
          />

          {/* Negocios asociados */}
          <EmployeeDetailAssociatedBusinesses
            employee={employee as EmployeeModel}
            onDeleteBusiness={(id: string) => console.log(id)}
          />

          {/* Salaries Section */}
          <EmployeeDetailSalarySection employee={employee as EmployeeModel} />
        </Card>
      </Box>
    </>
  );
};
export default EmployeeDetail;
