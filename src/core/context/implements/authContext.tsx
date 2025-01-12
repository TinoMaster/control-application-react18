import { ReactNode, useCallback, useEffect, useState } from "react";
import { AuthContext } from "../use/useAuthContext";
import { ERole, TRole, UserModel } from "../../models/api";
import { decodeJWT } from "../../utilities/helpers/jwtDecode";
import { appService } from "../../services/appService";
import { EmployeeModel } from "../../models/api/employee.model";
import { employeeService } from "../../services/employeeService";

interface IContextProps {
  children: ReactNode;
}

export interface IAuthContext {
  isLoggedIn: () => boolean;
  role: TRole;
  user: UserModel | undefined;
  employee: EmployeeModel | undefined;
  loadingUser: boolean;
  reloadUser: () => void;
  logout: () => void;
}

export const AuthProvider = ({ children }: IContextProps) => {
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState<UserModel | undefined>(undefined);
  const [employee, setEmployee] = useState<EmployeeModel | undefined>(
    undefined
  );
  const role: TRole = localStorage.getItem("role") as TRole;
  const token = localStorage.getItem("token");
  const userEmail = token ? decodeJWT(token).sub : null;

  const [reload, setReload] = useState(false);

  const reloadUser = () => setReload(!reload);

  const getUser = useCallback(
    async (email: string) => {
      setLoadingUser(true);
      const response = await appService.getUser(email);
      if (response.status === 200) {
        setUser(response.data);
        if (role !== ERole.SUPERADMIN && role !== ERole.OWNER) {
          const employeeResponse = await employeeService.getEmployeeByUserId(
            response.data?.id || 0
          );
          if (employeeResponse.status === 200) {
            setEmployee(employeeResponse.data);
          }
        }
      } else {
        logout();
      }
      setLoadingUser(false);
    },
    [role]
  );

  useEffect(() => {
    if (userEmail) {
      getUser(userEmail);
    }
  }, [userEmail, reload, getUser]);

  const isLoggedIn = (): boolean => {
    return token !== null && token !== "" && role !== null;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        role,
        user,
        loadingUser,
        reloadUser,
        employee,
        logout,
      }}
      children={children}
    />
  );
};
