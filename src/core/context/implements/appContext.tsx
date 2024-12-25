import { ReactNode } from "react";
import { AppContext } from "../use/useAppContext";
import { TRole } from "../../models/api";
import { Theme, useTheme } from "@mui/material";

interface IContextProps {
  children: ReactNode;
}

export interface IAppContext {
  role: TRole;
  materialTheme: Theme;
}

export const AppProvider = ({ children }: IContextProps) => {
  const materialTheme = useTheme();
  const role: TRole = localStorage.getItem("role") as TRole;

  return (
    <AppContext.Provider
      value={{ role, materialTheme }}
      children={children}
    />
  );
};
