import { ReactNode } from "react";
import { AuthContext } from "../use/useAuthContext";
import { TRole } from "../../models/api";

interface IContextProps {
  children: ReactNode;
}

export interface IAuthContext {
  isLoggedIn: () => boolean;
  role: TRole;
}

export const AuthProvider = ({ children }: IContextProps) => {
  const role: TRole = localStorage.getItem("role") as TRole;
  const token = localStorage.getItem("token");

  const isLoggedIn = (): boolean => {
    return token !== null && token !== "" && role !== null;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role }} children={children} />
  );
};
