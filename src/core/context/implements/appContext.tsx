import { ReactNode } from "react";
import { AppContext } from "../use/useAppContext";
import { TRole } from "../../models/api";
import { Theme, useTheme } from "@mui/material";

interface IContextProps {
  children: ReactNode;
}

export interface IAppContext {
  appTitle: string;
  role: TRole;
  materialTheme: Theme;
}

export const AppProvider = ({ children }: IContextProps) => {
  const materialTheme = useTheme();
  const role: TRole = localStorage.getItem("role") as TRole;
  const appTitle = "CONTROL";

  return (
    <AppContext.Provider
      value={{ appTitle, role, materialTheme }}
      children={children}
    />
  );
};
