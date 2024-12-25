import { ReactNode, useEffect, useState } from "react";
import { BusinessModel, ERole } from "../../models/api";
import { BusinessContext } from "../use/useBusinessContext";
import { useAuthContext } from "../use/useAuthContext";

interface IContextProps {
  children: ReactNode;
}

export interface IBusinessContext {
  businessList: BusinessModel[];
  business: BusinessModel;
  loading: boolean;
  addBusinessToBusinessList: (newBusiness: BusinessModel) => void;
}

export const BusinessProvider = ({ children }: IContextProps) => {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(true);

  const [businessList, setBusinessList] = useState<BusinessModel[]>([]);
  const [business, setBusiness] = useState<BusinessModel>({} as BusinessModel);

  useEffect(() => {
    if (user) {
      setLoading(false);

      if (user.role === ERole.OWNER) {
        setBusinessList(user.businessesOwned);
        setBusiness(user.businessesOwned[0]);
      } else {
        setBusinessList(user.businesses);
        setBusiness(user.businesses[0]);
      }
    }
  }, [user]);

  const addBusinessToBusinessList = (newBusiness: BusinessModel) => {
    setBusinessList([...businessList, newBusiness]);
    console.log(newBusiness);
    console.log(businessList)
  };

  return (
    <BusinessContext.Provider
      value={{ businessList, business, loading, addBusinessToBusinessList }}
      children={children}
    />
  );
};
