import { useCallback, useEffect, useState } from "react";
import { ServiceSaleModel } from "../models/api/serviceSale.model";
import { serviceSaleService } from "../services/serviceSaleService";
import { ByBusinessAndDateRequestModel } from "../models/api/requests/byBusinessAndDateRequest.model";
import { useBusinessContext } from "../context/use/useBusinessContext";

export const useServiceSale = () => {
  const { business } = useBusinessContext();
  const businessId = business?.id;
  const [serviceSales, setServiceSales] = useState<ServiceSaleModel[]>([]);
  const [loadingServiceSales, setLoadingServiceSales] =
    useState<boolean>(true);

  const getServiceSales = useCallback(async () => {
    if (!businessId) return;

    const requestType: ByBusinessAndDateRequestModel = {
      businessId: businessId,
      startDate: new Date(),
      endDate: new Date(),
    };

    setLoadingServiceSales(true);
    try {
      const response =
        await serviceSaleService.getServiceSalesByBusinessIdAndDate(
          requestType
        );
      if (response.status === 200) {
        setServiceSales(response.data || []);
      }
      setLoadingServiceSales(false);
    } catch (error) {
      console.error("Error fetching service sales:", error);
      setLoadingServiceSales(false);
    }
  }, [businessId]);

  const addServiceSaleToServiceSales = (serviceSale: ServiceSaleModel) => {
    setServiceSales([...serviceSales, serviceSale]);
  };

  const editServiceSaleFromServiceSales = (serviceSale: ServiceSaleModel) => {
    setServiceSales(
      serviceSales.map((s) => (s.id === serviceSale.id ? serviceSale : s))
    );
  };

  const deleteServiceSaleFromServiceSales = (id: number) => {
    setServiceSales(serviceSales.filter((s) => s.id !== id));
  };

  useEffect(() => {
    getServiceSales();
  }, [getServiceSales]);

  return {
    serviceSales,
    loadingServiceSales,
    addServiceSaleToServiceSales,
    editServiceSaleFromServiceSales,
    deleteServiceSaleFromServiceSales,
  };
};
