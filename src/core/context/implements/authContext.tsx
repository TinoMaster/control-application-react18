import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../use/useAuthContext";
import { TRole, UserModel } from "../../models/api";
import { decodeJWT } from "../../utilities/helpers/jwtDecode";
import { appService } from "../../services/appService";

interface IContextProps {
  children: ReactNode;
}

export interface IAuthContext {
  isLoggedIn: () => boolean;
  role: TRole;
  user: UserModel | undefined;
  loadingUser: boolean;
}

export const AuthProvider = ({ children }: IContextProps) => {
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState<UserModel | undefined>(undefined);
  const role: TRole = localStorage.getItem("role") as TRole;
  const token = localStorage.getItem("token");
  const userEmail = token ? decodeJWT(token).sub : null;

  const getUser = async (email: string) => {
    setLoadingUser(true);
    const response = await appService.getUser(email);
    if (response.status === 200) {
      setUser(response.data);
    }
    setLoadingUser(false);
  };

  useEffect(() => {
    if (userEmail) {
      getUser(userEmail);
    }
  }, [userEmail]);

  const isLoggedIn = (): boolean => {
    return token !== null && token !== "" && role !== null;
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, user, loadingUser }}
      children={children}
    />
  );
};
