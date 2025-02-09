import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBusinessContext } from "../context/use/useBusinessContext";
import { useNotification } from "../context/NotificationContext";
import { consumableService } from "../services/consumableService";
import { ConsumableModel } from "../models/api/consumables.model";

export const useConsumable = () => {
  const { businessId } = useBusinessContext();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const { data: consumables = [], isLoading: loadingConsumables } = useQuery({
    queryKey: ["consumables", businessId],
    queryFn: async () => {
      const response = await consumableService.getConsumablesByBusinessId(
        businessId!
      );
      return response.data || [];
    },
    enabled: !!businessId,
  });

  const { mutate: saveConsumable, isPending: loadingSave } = useMutation({
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

  const { mutate: deleteConsumable, isPending: loadingDelete } = useMutation({
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
    loadingConsumables,
    saveConsumable,
    loadingSave,
    deleteConsumable,
    loadingDelete,
  };
};
