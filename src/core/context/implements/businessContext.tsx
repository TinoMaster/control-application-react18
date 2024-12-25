import { ReactNode, useCallback, useEffect, useState } from "react";
import { BusinessModel, ERole } from "../../models/api";
import { BusinessContext } from "../use/useBusinessContext";
import { useAuthContext } from "../use/useAuthContext";
import { appService } from "../../services/appService";

interface IContextProps {
  children: ReactNode;
}

export interface IBusinessContext {
  businessList: BusinessModel[];
  business: BusinessModel;
  loading: boolean;
}

export const BusinessProvider = ({ children }: IContextProps) => {
  const { userEmail } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const [businessList, setBusinessList] = useState<BusinessModel[]>([]);
  const [business, setBusiness] = useState<BusinessModel>({} as BusinessModel);

  const getBusinesses = useCallback(async () => {
    setLoading(true);
    if (userEmail) {
      const response = await appService.getUser(userEmail);
      console.log(response);
      if (response.status === 200) {
        if (response.data?.role === ERole.OWNER) {
          setBusinessList(response.data?.businessesOwned || []);
          setBusiness(
            response.data?.businessesOwned[0] || ({} as BusinessModel)
          );
        } else {
          setBusinessList(response.data?.businesses || []);
          setBusiness(response.data?.businesses[0] || ({} as BusinessModel));
        }
      }
    }
    setLoading(false);
  }, [userEmail]);

  useEffect(() => {
    getBusinesses();
  }, [getBusinesses]);

  return (
    <BusinessContext.Provider
      value={{ businessList, business, loading }}
      children={children}
    />
  );
};
