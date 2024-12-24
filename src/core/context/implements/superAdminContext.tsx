import { ReactNode, useEffect, useState } from "react";
import { SuperAdminContext } from "../use/useSuperAdminContext";
import { IAuthRequest } from "../../types/admin/admin.types";
import { authRequestsService } from "../../services/admin/authRequestsService";
import { UserModelListToAuthRequestListMapper } from "../../mappers/global.mapper";

interface IContextProps {
  children: ReactNode;
}

export interface ISuperAdminContext {
  superAdmin: boolean;
  authRequests: IAuthRequest[];
  deleteAuthRequestById: (id: number) => void;
}

export const SuperAdminProvider = ({ children }: IContextProps) => {
  const [authRequests, setAuthRequests] = useState<IAuthRequest[]>([]);
  const superAdmin = true;

  const getRequests = async () => {
    const res = await authRequestsService.getRequests();
    console.log(res);

    if (res.status === 200) {
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
