import { ReactNode, useEffect, useState } from "react";
import { BusinessModel, ERole } from "../../models/api";
import { BusinessContext } from "../use/useBusinessContext";
import { useAuthContext } from "../use/useAuthContext";
import { selectBusiness } from "../../utilities/helpers/selectBusiness";

interface IContextProps {
  children: ReactNode;
}

export interface IBusinessContext {
  businessList: BusinessModel[];
  business: BusinessModel;
  loading: boolean;
  addBusinessToBusinessList: (newBusiness: BusinessModel) => void;
  onChangeBusiness: (id: number) => void;
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
        setBusiness(selectBusiness(businessList) || user.businessesOwned[0]);
      } else {
        setBusinessList(user.businesses);
        setBusiness(selectBusiness(businessList) || user.businesses[0]);
      }
    }
  }, [user, businessList]);

  const addBusinessToBusinessList = (newBusiness: BusinessModel) => {
    setBusinessList([...businessList, newBusiness]);
  };

  const onChangeBusiness = (id: number) => {
    const newBusiness = businessList.find((b) => b.id === id);
    if (newBusiness) {
      localStorage.setItem("businessId", newBusiness.id?.toString() || "");
      setBusiness(newBusiness);
    }
  };

  return (
    <BusinessContext.Provider
      value={{
        businessList,
        business,
        loading,
        addBusinessToBusinessList,
        onChangeBusiness,
      }}
      children={children}
    />
  );
};
