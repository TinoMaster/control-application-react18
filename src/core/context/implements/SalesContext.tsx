import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { BusinessFinalSaleModelResponse } from "../../models/api/businessFinalSale.model";
import { businessFinalSaleService } from "../../services/businessFinalSaleService";
import { useBusinessContext } from "../use/useBusinessContext";
import { SalesContext } from "../use/useSalesContext";

interface IContextProps {
  children: ReactNode;
}

export interface ISalesContext {
  lastSale: BusinessFinalSaleModelResponse | undefined;
}

export const SalesProvider = ({ children }: IContextProps) => {
  const { businessId } = useBusinessContext();
  // TODO: implementar a partir de este contexto el resto en business final sale que depende de este contexto, como por ejemplo el fondo de la ultima venta
  const [lastSale, setLastSale] = useState<
    BusinessFinalSaleModelResponse | undefined
  >(undefined);

  const getLastSale = useCallback(async () => {
    const res = await businessFinalSaleService.getLastBusinessFinalSale(
      businessId as number
    );

    console.log(res);

    if (res.status === 200) {
      setLastSale(res.data);
    }
  }, [businessId]);

  useEffect(() => {
    if (!businessId) return;
    getLastSale();
  }, [getLastSale, businessId]);

  const contextValue = useMemo(() => {
    return {
      lastSale,
    };
  }, [lastSale]);

  return (
    <SalesContext.Provider value={contextValue}>
      {children}
    </SalesContext.Provider>
  );
};
