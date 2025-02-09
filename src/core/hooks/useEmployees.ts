import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useBusinessContext } from "../context/use/useBusinessContext";
import { employeeService } from "../services/employeeService";
import { useNavigate } from "react-router-dom";
import { EmployeeModel } from "../models/api/employee.model";
import { useNotification } from "../context/NotificationContext";

export const useEmployees = () => {
  const { businessId } = useBusinessContext();
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
  };
};
