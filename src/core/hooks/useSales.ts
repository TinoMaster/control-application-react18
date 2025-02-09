import { useQuery } from "@tanstack/react-query";
import { useBusinessContext } from "../context/use/useBusinessContext";
import { businessFinalSaleService } from "../services/businessFinalSaleService";
import { BusinessFinalSaleModelResponse } from "../models/api/businessFinalSale.model";

export const useSales = (): { lastSale: BusinessFinalSaleModelResponse | undefined, loadingSales: boolean } => {
  const { businessId } = useBusinessContext();

  const { data: lastSale, isLoading: loadingSales } = useQuery<BusinessFinalSaleModelResponse | undefined>({
    queryKey: ["sales", businessId],
    queryFn: async () => {
      const response = await businessFinalSaleService.getLastBusinessFinalSale(
        businessId as number
      );
      return response.data;
    },
    enabled: !!businessId,
  });

  return {
    lastSale,
    loadingSales,
  };
};
