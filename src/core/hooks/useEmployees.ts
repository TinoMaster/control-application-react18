import { useCallback, useEffect, useState } from "react";
import { useBusinessContext } from "../context/use/useBusinessContext";
import { EmployeeModel } from "../models/api/employee.model";
import { employeeService } from "../services/employeeService";
import { useBoolean } from "./customs/useBoolean";

export const useEmployees = () => {
  const { businessId } = useBusinessContext();

  const [employees, setEmployees] = useState<EmployeeModel[]>([]);
  const [
    loadingEmployees,
    { setTrue: setTrueLoadingEmployees, setFalse: setFalseLoadingEmployees },
  ] = useBoolean(false);

  const getEmployeesByBusiness = useCallback(async () => {
    setTrueLoadingEmployees();
    const response = await employeeService.getEmployeesByBusinessId(
      businessId!
    );
    if (response.status === 200) {
      setEmployees(response.data || []);
    }
    setFalseLoadingEmployees();
  }, [businessId, setFalseLoadingEmployees, setTrueLoadingEmployees]);

  const filterEmployeesReadyToWork = () => {
    return employees.filter((e) => {
      return e.user.active && (e.percentSalary > 0 || e.fixedSalary > 0);
    });
  };

  const getTotalSalary = (total: number, employees: EmployeeModel[]) => {
    return employees.reduce((acc, e) => {
      return (
        acc +
        (e.percentSalary > 0 ? e.percentSalary  * total : 0) +
        (e.fixedSalary || 0)
      );
    }, 0);
  };

  const filterActiveEmployees = () => {
    return employees.filter((e) => e.user.active);
  };

  useEffect(() => {
    getEmployeesByBusiness();
  }, [getEmployeesByBusiness]);

  return {
    employees,
    loadingEmployees,
    filterEmployeesReadyToWork,
    filterActiveEmployees,
    getTotalSalary,
  };
};
