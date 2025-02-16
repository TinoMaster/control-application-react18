import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBusinessStore } from "../store/business.store";
import { useNotification } from "../context/NotificationContext";
import { consumableService } from "../services/consumableService";
import { ConsumableModel } from "../models/api/consumables.model";

export const useConsumable = () => {
  const { businessId } = useBusinessStore();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const { data: consumables = [] } = useQuery({
    queryKey: ["consumables", businessId],
    queryFn: async () => {
      const response = await consumableService.getConsumablesByBusinessId(
        businessId!
      );
      return response.data || [];
    },
    enabled: !!businessId,
  });

  const { mutate: onSaveConsumable } = useMutation({
    mutationFn: (consumable: ConsumableModel) =>
      consumableService.saveConsumable(consumable),
    onSuccess: () => {
      showSuccess("Consumible guardado correctamente");
      queryClient.invalidateQueries({ queryKey: ["consumables"] });
    },
    onError: () => {
      showError(
        "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente."
      );
    },
  });

  const { mutate: onDeleteConsumable } = useMutation({
    mutationFn: (id: number) => consumableService.deleteConsumable(id),
    onSuccess: () => {
      showSuccess("Consumible eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["consumables"] });
    },
    onError: () => {
      showError(
        "Ha ocurrido un error inesperado, revise su conexión a internet e intente nuevamente."
      );
    },
  });

  return {
    consumables,
    onSaveConsumable,
    onDeleteConsumable,
  };
};
