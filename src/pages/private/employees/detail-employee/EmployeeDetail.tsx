import { Alert, Card, CircularProgress, Modal, Snackbar } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useThemeContext } from "../../../../core/context/use/useThemeContext";
import { EmployeeModel } from "../../../../core/models/api/employee.model";
import { employeeService } from "../../../../core/services/employeeService";
import { EmployeeDetailAssociatedBusinesses } from "./associatedBusinesses-section/EmployeeDetailAssociatedBusinesses";
import { EmployeeDetailDescriptionSection } from "./description-section/EmployeeDetailDescriptionSection";
import { EmployeeDetailHeaderSection } from "./header-section/EmployeeDetailHeaderSection";
import { EmployeeDetailSalarySection } from "./salary-section/EmployeeDetailSalarySection";

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

  const updateEmployee = (employee: EmployeeModel) => {
    setEmployee(employee);
  };

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
    </>
  );
};
export default EmployeeDetail;
