import { ReactNode, useMemo } from "react";
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

  const contextValue = useMemo(() => {
    return {
      role,
      materialTheme,
    };
  }, [role, materialTheme]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
