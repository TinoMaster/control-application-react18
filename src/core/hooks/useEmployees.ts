import { useCallback, useEffect, useState } from "react";
import { EmployeeModel } from "../models/api/employee.model";
import { employeeService } from "../services/employeeService";

interface Props {
  businessId: number | undefined;
}

export const useEmployees = ({ businessId }: Props) => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);

  const getEmployeesByBusiness = useCallback(async () => {
    const response = await employeeService.getEmployeesByBusinessId(
      businessId!
    );
    if (response.status === 200) {
      setEmployees(response.data || []);
    }
  }, [businessId]);

  const filterEmployeesReadyToWork = () => {
    return employees.filter((e) => {
      return e.user.active && (e.percentSalary > 0 || e.fixedSalary > 0);
    });
  };

  const filterActiveEmployees = () => {
    return employees.filter((e) => e.user.active);
  };

  useEffect(() => {
    getEmployeesByBusiness();
  }, [getEmployeesByBusiness]);

  return {
    employees,
    filterEmployeesReadyToWork,
    filterActiveEmployees,
  };
};
