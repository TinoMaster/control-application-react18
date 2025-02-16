import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "../context/NotificationContext";
import { useBusinessStore } from "../store/business.store";
import { ByBusinessAndDateRequestModel } from "../models/api/requests/byBusinessAndDateRequest.model";
import { ServiceSaleModel } from "../models/api/serviceSale.model";
import { serviceSaleService } from "../services/serviceSaleService";

export const useServiceSale = () => {
  const { businessId } = useBusinessStore();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const requestType: ByBusinessAndDateRequestModel = {
    businessId: businessId || 0,
    startDate: new Date(),
    endDate: new Date(),
  };

  const { data: serviceSales, isLoading: loadingServiceSales } = useQuery({
    queryKey: ["serviceSales", businessId],
    queryFn: async () => {
      const response =
        await serviceSaleService.getServiceSalesByBusinessIdAndDate(
          requestType
        );
      return response.data || [];
    },
    enabled: !!businessId,
  });

  const { mutate: saveServiceSale } = useMutation({
    mutationFn: (serviceSale: ServiceSaleModel) =>
      serviceSaleService.saveServiceSale(serviceSale),
    onSuccess: () => {
      showSuccess("Venta de servicio creada correctamente");
      queryClient.invalidateQueries({ queryKey: ["serviceSales"] });
    },
    onError: () => {
      showError(
        "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente."
      );
    },
  });

  const { mutate: editServiceSale } = useMutation({
    mutationFn: (serviceSale: ServiceSaleModel) =>
      serviceSaleService.updateServiceSale(serviceSale),
    onSuccess: () => {
      showSuccess("Venta de servicio actualizada correctamente");
      queryClient.invalidateQueries({ queryKey: ["serviceSales"] });
    },
    onError: () => {
      showError(
        "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente."
      );
    },
  });

  const { mutate: deleteServiceSale } = useMutation({
    mutationFn: (id: number) => serviceSaleService.deleteServiceSale(id),
    onSuccess: () => {
      showSuccess("Venta de servicio eliminada correctamente");
      queryClient.invalidateQueries({ queryKey: ["serviceSales"] });
    },
    onError: () => {
      showError(
        "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente."
      );
    },
  });

  return {
    serviceSales,
    loadingServiceSales,
    saveServiceSale,
    editServiceSale,
    deleteServiceSale,
  };
};
