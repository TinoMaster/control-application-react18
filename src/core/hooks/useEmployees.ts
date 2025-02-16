import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import { EmployeeModel } from "../models/api/employee.model";
import { employeeService } from "../services/employeeService";
import { useBusinessStore } from "../store/business.store";

export const useEmployees = (userId?: number) => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();

  const { data: employees = [], isLoading: loadingEmployees } = useQuery({
    queryKey: ["employees", businessId],
    queryFn: async () => {
      const response = await employeeService.getEmployeesByBusinessId(
        businessId!
      );
      return response.data || [];
    },
    select: (data) =>
      data.sort((a, b) => b.user.name.localeCompare(a.user.name)),
    enabled: !!businessId,
  });

  const {
    data: employee,
    isLoading: loadingEmployee,
    refetch: reloadEmployee,
  } = useQuery({
    queryKey: ["employee", userId],
    queryFn: async () => {
      const response = await employeeService.getEmployeeByUserId(userId!);
      return response.data || [];
    },
    enabled: !!userId,
  });

  const { mutate: saveEmployee, isPending: loadingSave } = useMutation({
    mutationFn: (employee: EmployeeModel) =>
      employeeService.saveEmployee(employee),
    onSuccess: () => {
      showSuccess("Empleado guardado correctamente");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      navigate("/employees/list");
    },
    onError: () => {
      showError(
        "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente."
      );
    },
  });

  return {
    employees,
    loadingEmployees,
    saveEmployee,
    loadingSave,
    employee,
    loadingEmployee,
    reloadEmployee,
  };
};
