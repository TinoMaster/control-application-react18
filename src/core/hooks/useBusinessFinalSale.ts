import { useCallback, useEffect, useState } from "react";
import { useBusinessStore } from "../store/business.store";
import { BusinessFinalSaleModelResponse } from "../models/api/businessFinalSale.model";
import { ByBusinessAndDateRequestModel } from "../models/api/requests/byBusinessAndDateRequest.model";
import { businessFinalSaleService } from "../services/businessFinalSaleService";

export const useBusinessFinalSale = () => {
  const { business } = useBusinessStore();
  const businessId = business?.id;
  const [todayReports, setTodayReports] = useState<
    BusinessFinalSaleModelResponse[]
  >([]);

  const getTodayReports = useCallback(async () => {
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

    if (response.status === 200) {
      setTodayReports(response.data || []);
    }
  }, [businessId]);

  const machinesAlreadySelected = () => {
    return todayReports
      .map((report) => report.machines.map((machine) => machine.id))
      .flat();
  };

  const workersAlreadySelected = () => {
    return todayReports.map((report) => report.workers).flat();
  };

  useEffect(() => {
    if (businessId) getTodayReports();
  }, [getTodayReports, businessId]);

  return {
    todayReports,
    getTodayReports,
    machinesAlreadySelected,
    workersAlreadySelected,
  };
};
