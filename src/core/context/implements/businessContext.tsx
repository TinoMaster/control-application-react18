import { ReactNode, useCallback, useEffect, useState } from "react";
import { BusinessModel } from "../../models/api";
import { BusinessContext } from "../use/useBusinessContext";
import { useAuthContext } from "../use/useAuthContext";
import { appService } from "../../services/appService";

interface IContextProps {
  children: ReactNode;
}

export interface IBusinessContext {
  businessList: BusinessModel[];
  business: BusinessModel;
}

export const BusinessProvider = ({ children }: IContextProps) => {
  const { userEmail } = useAuthContext();
  const [businessList, setBusinessList] = useState<BusinessModel[]>([]);
  const [business, setBusiness] = useState<BusinessModel>({} as BusinessModel);

  const getBusinesses = useCallback(async () => {
    if (userEmail) {
      const response = await appService.getUser(userEmail);
      console.log(response);
      if (response.status === 200) {
        setBusinessList(response.data?.businessesOwned || []);
        setBusiness(response.data?.businessesOwned[0] || ({} as BusinessModel));
      }
    }
  }, [userEmail]);

  useEffect(() => {
    getBusinesses();
  }, [getBusinesses]);

  return (
    <BusinessContext.Provider
      value={{ businessList, business }}
      children={children}
    />
  );
};
