import { ReactNode, useMemo } from "react";
import { useSales } from "../../hooks/useSales";
import { BusinessFinalSaleModelResponse } from "../../models/api/businessFinalSale.model";
import { SalesContext } from "../use/useSalesContext";

interface IContextProps {
  children: ReactNode;
}

export interface ISalesContext {
  lastSale: BusinessFinalSaleModelResponse | undefined;
}

export const SalesProvider = ({ children }: IContextProps) => {
  const { lastSale, loadingSales } = useSales();

  const contextValue = useMemo(() => {
    return {
      lastSale,
      loadingSales,
    };
  }, [lastSale, loadingSales]);

  return (
    <SalesContext.Provider value={contextValue}>
      {children}
    </SalesContext.Provider>
  );
};
