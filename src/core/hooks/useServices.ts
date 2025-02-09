import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBusinessContext } from "../context/use/useBusinessContext";
import { serviceService } from "../services/serviceService";
import { useNotification } from "../context/NotificationContext";
import { ServiceModel } from "../models/api";

export const useService = () => {
  const { businessId } = useBusinessContext();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const { data: services = [], isLoading: loadingServices } = useQuery({
    queryKey: ["services", businessId],
    queryFn: async () => {
      const response = await serviceService.getServicesByBusinessId(
        businessId!
      );
      return response.data || [];
    },
    enabled: !!businessId,
  });

  const { mutate: saveService } = useMutation({
    mutationFn: (service: ServiceModel) => serviceService.saveService(service),
    onSuccess: () => {
      showSuccess("Servicio guardado correctamente");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      showError(
        "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente."
      );
    },
  });

  const { mutate: deleteService } = useMutation({
    mutationFn: (id: number) => serviceService.deleteService(id),
    onSuccess: () => {
      showSuccess("Servicio eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      showError(
        "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente."
      );
    },
  });

  return {
    services,
    loadingServices,
    saveService,

    deleteService,
  };
};
