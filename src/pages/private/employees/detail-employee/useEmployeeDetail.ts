import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EmployeeModel } from "../../../../core/models/api/employee.model";
import { employeeService } from "../../../../core/services/employeeService";

export const useEmployeeDetail = () => {
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

  return {
    loading,
    success,
    error,
    employee,
    updateEmployee,
    onDeleteEmployee,
  };
};
