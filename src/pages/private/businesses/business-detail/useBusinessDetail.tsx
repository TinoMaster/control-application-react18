import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BusinessModel } from "../../../../core/models/api";
import { businessService } from "../../../../core/services/businessService";
import { employeeService } from "../../../../core/services/employeeService";
import { EmployeeModel } from "../../../../core/models/api/employee.model";

export const useBusinessDetail = () => {
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

  return {
    loading,
    success,
    error,
    business,
    personalList,
    onDeleteBusiness,
  };
};
