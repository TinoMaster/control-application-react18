import { useCallback, useEffect, useState } from "react";
import { ServiceModel } from "../models/api";
import { serviceService } from "../services/serviceService";

interface Props {
  businessId: number | undefined;
}

export const useService = ({ businessId }: Props) => {
  const [services, setServices] = useState<ServiceModel[]>([]);

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
