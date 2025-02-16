import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ERole, TRole, UserModel } from "../../models/api";
import { EmployeeModel } from "../../models/api/employee.model";
import { employeeService } from "../../services/employeeService";
import { decodeJWT } from "../../utilities/helpers/jwtDecode";
import { AuthContext } from "../use/useAuthContext";
import { userService } from "../../services/userService";
import { useBusinessStore } from "../../store/business.store";

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
  const { initializeBusiness } = useBusinessStore();
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState<UserModel | undefined>(undefined);
  const [employee, setEmployee] = useState<EmployeeModel | undefined>(
    undefined
  );
  const role: TRole = localStorage.getItem("role") as TRole;
  const token = localStorage.getItem("token");
  const userEmail = token ? decodeJWT(token).sub : null;

  const [reload, setReload] = useState(false);

  const reloadUser = useCallback(() => setReload(!reload), [reload]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }, []);

  const getUser = useCallback(
    async (email: string) => {
      setLoadingUser(true);
      const response = await userService.getUser(email);
      if (response.status === 200 && response.data) {
        initializeBusiness(response.data);
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
    [role, logout]
  );

  useEffect(() => {
    if (userEmail) {
      getUser(userEmail);
    }
  }, [userEmail, reload, getUser]);

  const isLoggedIn = useCallback((): boolean => {
    return token !== null && token !== "" && role !== null;
  }, [token, role]);

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      role,
      user,
      loadingUser,
      reloadUser,
      employee,
      logout,
    }),
    [isLoggedIn, role, user, loadingUser, reloadUser, employee, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
