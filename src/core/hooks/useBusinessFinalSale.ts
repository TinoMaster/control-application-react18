import { useCallback, useEffect, useState } from "react";
import { BusinessFinalSaleModelResponse } from "../models/api/businessFinalSale.model";
import { ByBusinessAndDateRequestModel } from "../models/api/requests/byBusinessAndDateRequest.model";
import { businessFinalSaleService } from "../services/businessFinalSaleService";

export const useBusinessFinalSale = ({
  businessId,
}: {
  businessId: number | undefined;
}) => {
  const [todayReports, setTodayReports] = useState<
    BusinessFinalSaleModelResponse[]
  >([]);

  const getTodayReport = useCallback(async () => {
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
    if (businessId) getTodayReport();
  }, [getTodayReport, businessId]);

  return {
    todayReports,
    setTodayReports,
    machinesAlreadySelected,
    workersAlreadySelected,
  };
};
