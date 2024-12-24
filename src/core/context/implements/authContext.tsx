import { ReactNode } from "react";
import { AuthContext } from "../use/useAuthContext";
import { TRole } from "../../models/api";
import { decodeJWT } from "../../utilities/helpers/jwtDecode";

interface IContextProps {
  children: ReactNode;
}

export interface IAuthContext {
  isLoggedIn: () => boolean;
  role: TRole;
  userEmail: string | null;
}

export const AuthProvider = ({ children }: IContextProps) => {
  const role: TRole = localStorage.getItem("role") as TRole;
  const token = localStorage.getItem("token");
  const userEmail = token ? decodeJWT(token).sub : null;

  const isLoggedIn = (): boolean => {
    return token !== null && token !== "" && role !== null;
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, userEmail }}
      children={children}
    />
  );
};
