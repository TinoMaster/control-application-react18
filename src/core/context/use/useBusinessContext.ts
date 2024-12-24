import { createContext, useContext } from "react";
import { IBusinessContext } from "../implements/businessContext";

export const BusinessContext = createContext<IBusinessContext | null>(null);

export const useBusinessContext = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error(
      "useBusinessContext must be used within a BusinessProvider"
    );
  }
  return context;
};
