export const SECTIONS_BUSINESS_REPORT = {
  RESUME: "RESUME",
  DEBTS: "DEBTS",
  CARDS: "CARDS",
  SERVICES: "SERVICES",
  MIRON: "MIRON",
  REPORT: "REPORT",
  END: "END",
};

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
};
