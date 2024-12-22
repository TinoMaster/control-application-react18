import { ReactNode, useEffect, useState } from "react";
import { SuperAdminContext } from "../use/useSuperAdminContext";
import { IAuthRequest } from "../../types/admin/admin.types";
import { authRequestsService } from "../../services/admin/authRequests";
import { UserModelListToAuthRequestListMapper } from "../../mappers/global.mapper";

interface IContextProps {
  children: ReactNode;
}

export interface ISuperAdminContext {
  superAdmin: boolean;
  authRequests: IAuthRequest[];
  deleteAuthRequestById: (id: number) => void;
}

const simulatedAuthRequests: IAuthRequest[] = [
  {
    userId: 1,
    user_name: "John Doe",
    user_email: "s2BZS@example.com",
    user_data_request: new Date(),
    business_name: "Acme Inc.",
    business_address: "123 Main St, Anytown, USA",
    business_phone: "555-555-5555",
  },
];

export const SuperAdminProvider = ({ children }: IContextProps) => {
  const [authRequests, setAuthRequests] = useState<IAuthRequest[]>(
    simulatedAuthRequests
  );
  const superAdmin = true;

  const getRequests = async () => {
    const res = await authRequestsService.getRequests();
    
    if(res.status === 200){
      const requests = UserModelListToAuthRequestListMapper(res.data || []);
      setAuthRequests(requests);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const deleteAuthRequestById = (id: number) => {
    setAuthRequests(
      authRequests.filter((authRequest) => authRequest.userId !== id)
    );
  };

  return (
    <SuperAdminContext.Provider
      value={{ superAdmin, authRequests, deleteAuthRequestById }}
      children={children}
    />
  );
};
