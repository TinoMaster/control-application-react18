import { createContext, useContext } from "react";
import { ISalesContext } from "../implements/SalesContext";

export const SalesContext = createContext<ISalesContext | null>(null);

export const useSalesContext = () => {
  const context = useContext(SalesContext);
  if (context === undefined) {
    throw new Error("useSalesContext must be used within a SalesProvider");
  }
  return context;
};
