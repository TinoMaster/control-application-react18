import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BusinessFinalSaleModelResponse,
  BusinessFinalSaleModelToCreate,
} from "../models/api/businessFinalSale.model";
import { ByBusinessAndDateRequestModel } from "../models/api/requests/byBusinessAndDateRequest.model";
import { businessFinalSaleService } from "../services/businessFinalSaleService";
import { useBusinessStore } from "../store/business.store";
import { useNotification } from "../context/NotificationContext";

export const useBusinessFinalSale = () => {
  const businessId = useBusinessStore((state) => state.businessId);
  const queryClient = useQueryClient();

  const { showSuccess, showError } = useNotification();

  const { data: todayReports, isLoading: loadingTodayReports } = useQuery<
    BusinessFinalSaleModelResponse[] | undefined
  >({
    queryKey: ["todayReports", businessId],
    queryFn: async () => {
      const today = new Date();
      const request: ByBusinessAndDateRequestModel = {
        businessId: businessId || 0,
        startDate: today,
        endDate: today,
      };

      const response =
        await businessFinalSaleService.getBusinessFinalSalesByBusinessIdAndDate(
          request
        );

      return response.data || [];
    },
  });

  const { mutateAsync: saveBusinessFinalSale, isPending: loadingSave } =
    useMutation({
      mutationFn: (businessFinalSale: BusinessFinalSaleModelToCreate) =>
        businessFinalSaleService.saveBusinessFinalSale(businessFinalSale),
      onSuccess: () => {
        showSuccess("Venta final de negocio creada correctamente");
        queryClient.invalidateQueries({
          queryKey: ["todayReports", businessId],
        });
      },
      onError: () => {
        showError("Error al crear la venta final de negocio");
      },
    });

  const { mutateAsync: deleteBusinessFinalSale, isPending: loadingDelete } =
    useMutation({
      mutationFn: (id: number) =>
        businessFinalSaleService.deleteBusinessFinalSale(id),
      onSuccess: () => {
        showSuccess("Venta final de negocio eliminada correctamente");
        queryClient.invalidateQueries({
          queryKey: ["todayReports", businessId],
        });
      },
      onError: () => {
        showError("Error al eliminar la venta final de negocio");
      },
    });

  const machinesAlreadySelected = () => {
    return todayReports
      ?.map((report) => report.machines.map((machine) => machine.id))
      .flat();
  };

  const workersAlreadySelected = () => {
    return todayReports?.map((report) => report.workers).flat();
  };

  return {
    todayReports,
    loadingTodayReports,
    machinesAlreadySelected,
    workersAlreadySelected,
    saveBusinessFinalSale,
    loadingSave,
    deleteBusinessFinalSale,
    loadingDelete,
  };
};
