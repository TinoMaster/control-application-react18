import { createContext, useContext } from "react";
import { IBusinessReportContext } from "./businessReportContext";

export const SECTIONS_BUSINESS_REPORT = {
  RESUME: "RESUME",
  DEBTS: "DEBTS",
  CARDS: "CARDS",
  SERVICES: "SERVICES",
  MIRON: "MIRON",
  REPORT: "REPORT",
  END: "END",
};

export interface CardPayment {
  id: string;
  cardNumber: string;
  amount: number;
}

export const SECTIONS_TRANSLATIONS = {
  [SECTIONS_BUSINESS_REPORT.RESUME]: {
    title: "RESUMEN",
    subtitle: "Ingrese la información principal",
  },
  [SECTIONS_BUSINESS_REPORT.DEBTS]: {
    title: "DEUDAS",
    subtitle: "Algún cliente con deuda hoy? Agréguelas aquí",
  },
  [SECTIONS_BUSINESS_REPORT.CARDS]: {
    title: "TARJETAS",
    subtitle: "Ah recibido alguna tarjeta hoy? Agréguelas aquí",
  },
  [SECTIONS_BUSINESS_REPORT.SERVICES]: {
    title: "SERVICIOS",
    subtitle: "Agregue los servicios que pertenezcan a este registro de ventas",
  },
  [SECTIONS_BUSINESS_REPORT.MIRON]: {
    title: "MIRON",
    subtitle: "Procesar los mirones del dia para obtener estadísticas",
  },
  [SECTIONS_BUSINESS_REPORT.REPORT]: {
    title: "REPORTE",
    subtitle: "Resumen del reporte",
  },
  [SECTIONS_BUSINESS_REPORT.END]: { title: "FINALIZADO", subtitle: "" },
};

export const BusinessReportContext =
  createContext<IBusinessReportContext | null>(null);

export const useBusinessReportContext = () => {
  const context = useContext(BusinessReportContext);
  if (!context)
    throw new Error(
      "useBusinessReportContext must be used within a BusinessReportProvider"
    );
  return context;
};
