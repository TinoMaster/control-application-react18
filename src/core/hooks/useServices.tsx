import { useCallback, useEffect, useState } from "react";
import { ServiceModel } from "../models/api";
import { serviceService } from "../services/serviceService";
import { useBusinessContext } from "../context/use/useBusinessContext";

export const useService = () => {
  const [services, setServices] = useState<ServiceModel[]>([]);
  const { business } = useBusinessContext();
  const businessId = business?.id;

  const getServices = useCallback(async () => {
    if (!businessId) return;

    try {
      const response = await serviceService.getServicesByBusinessId(businessId);
      if (response.status === 200) {
        setServices(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }, [businessId]);

  useEffect(() => {
    getServices();
  }, [getServices]);

  return { services };
};
