import { ReactNode, useMemo } from "react";
import { useSales } from "../../hooks/useSales";
import { BusinessFinalSaleModelResponse } from "../../models/api/businessFinalSale.model";
import { SalesContext } from "../use/useSalesContext";

interface IContextProps {
  children: ReactNode;
}

export interface ISalesContext {
  lastSales: BusinessFinalSaleModelResponse[] | undefined;
  loadingSales: boolean;
}

export const SalesProvider = ({ children }: IContextProps) => {
  const { lastSales, loadingSales } = useSales();

  console.log("lastSales", lastSales);

  const contextValue = useMemo(() => {
    return {
      lastSales,
      loadingSales,
    };
  }, [lastSales, loadingSales]);

  return (
    <SalesContext.Provider value={contextValue}>
      {children}
    </SalesContext.Provider>
  );
};
