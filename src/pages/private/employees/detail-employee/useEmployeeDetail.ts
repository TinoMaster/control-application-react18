import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStatus } from "../../../../core/hooks/customs/useStatus";
import { EmployeeModel } from "../../../../core/models/api/employee.model";
import { employeeService } from "../../../../core/services/employeeService";

export const useEmployeeDetail = () => {
  const {
    loading,
    setLoading,
    setSuccess,
    successMessage,
    errorMessage,
    setError,
  } = useStatus();

  const { id } = useParams();
  const [employee, setEmployee] = useState<EmployeeModel | undefined>(
    undefined
  );

  const updateEmployee = (employee: EmployeeModel) => {
    setEmployee(employee);
  };

  const getEmployee = useCallback(async () => {
    setLoading();
    if (!id) {
      return;
    }
    const response = await employeeService.getEmployeeById(id!);
    if (response.status === 200) {
      setEmployee(response.data);
      setSuccess("");
    } else {
      setError(response.message);
    }
  }, [id, setLoading, setSuccess, setError]);

  const onDeleteEmployee = async () => {
    setLoading();
    const response = await employeeService.deleteEmployee(id!);
    if (response.status === 200) {
      setSuccess("Empleado eliminado correctamente");
      setTimeout(() => {
        window.location.href = "/employees/list";
      }, 1000);
    } else {
      setError("Error al eliminar empleado");
    }
  };

  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

  return {
    loading,
    successMessage,
    errorMessage,
    employee,
    updateEmployee,
    onDeleteEmployee,
  };
};
