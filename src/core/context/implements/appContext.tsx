import { ReactNode, useEffect, useMemo } from "react";
import { AppContext } from "../use/useAppContext";
import { Theme, useTheme } from "@mui/material";
import { useAuthStore } from "../../store/auth.store";

interface IContextProps {
  children: ReactNode;
}

export interface IAppContext {
  materialTheme: Theme;
}

export const AppProvider = ({ children }: IContextProps) => {
  const materialTheme = useTheme();
  
  const reloadUser = useAuthStore((state) => state.reloadUser);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    // Solo intentamos recargar el usuario si hay un token
    if (token) {
      reloadUser();
    }
  }, [token, reloadUser]);

  const contextValue = useMemo(() => {
    return {
      materialTheme,
    };
  }, [materialTheme]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
