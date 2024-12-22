import { createContext, useContext } from "react";
import { ISuperAdminContext } from "../implements/superAdminContext";

export const SuperAdminContext = createContext<ISuperAdminContext | null>(null);

export const useSuperAdminContext = () => {
  const context = useContext(SuperAdminContext);
  if (!context) {
    throw new Error(
      "useSuperAdminContext must be used within an SuperAdminProvider"
    );
  }
  return context;
};
