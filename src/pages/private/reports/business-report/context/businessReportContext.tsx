import { ReactNode, useEffect, useState } from "react";
import {
  BusinessReportContext,
  CardPayment,
  SECTIONS_BUSINESS_REPORT,
} from "./useBusinessReportContext";
import { BusinessFinalSaleModel } from "../../../../../core/models/api/businessFinalSale.model";
import { businessFinalSaleService } from "../../../../../core/services/businessFinalSaleService";

interface IContextProps {
  children: ReactNode;
}

export interface IBusinessReportContext {
  currentSection: string;
  nextSection: () => void;
  prevSection: () => void;
  isComplete: boolean;
  businessSale: BusinessFinalSaleModel;
  setBusinessSale: React.Dispatch<React.SetStateAction<BusinessFinalSaleModel>>;
  cancelProcess: () => void;
  cards: CardPayment[];
  setCards: React.Dispatch<React.SetStateAction<CardPayment[]>>;
  saveBusinessSale: () => void;
  loading: boolean;
  success: boolean;
  error: boolean;
}

const initialBusinessSale: BusinessFinalSaleModel = {
  name: "",
  business: 0,
  total: 0,
  paid: 0,
  debts: [],
  note: "",
  workers: [],
  servicesSales: [],
  machines: [],
  doneBy: 0,
  found: 0,
};

export const BusinessReportProvider = ({ children }: IContextProps) => {
  const [currentSection, setCurrentSection] = useState(
    SECTIONS_BUSINESS_REPORT.RESUME
  );
  const [businessSale, setBusinessSale] = useState(initialBusinessSale);
  const [cards, setCards] = useState<CardPayment[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const cancelProcess = () => {
    setCurrentSection(SECTIONS_BUSINESS_REPORT.RESUME);
    setBusinessSale(initialBusinessSale);
  };

  const saveBusinessSale = async () => {
    setLoading(true);
    setError(false);
    setSuccess(false);

    const response = await businessFinalSaleService.saveBusinessFinalSale(
      businessSale
    );

    if (response.status === 200) {
      nextSection();
      setSuccess(true);
    } else {
      setError(true);
    }

    setLoading(false);
  };

  const nextSection = () => {
    switch (currentSection) {
      case SECTIONS_BUSINESS_REPORT.RESUME:
        setCurrentSection(SECTIONS_BUSINESS_REPORT.DEBTS);
        break;
      case SECTIONS_BUSINESS_REPORT.DEBTS:
        setCurrentSection(SECTIONS_BUSINESS_REPORT.CARDS);
        break;
      case SECTIONS_BUSINESS_REPORT.CARDS:
        setCurrentSection(SECTIONS_BUSINESS_REPORT.SERVICES);
        break;
      case SECTIONS_BUSINESS_REPORT.SERVICES:
        setCurrentSection(SECTIONS_BUSINESS_REPORT.MIRON);
        break;
      case SECTIONS_BUSINESS_REPORT.MIRON:
        setCurrentSection(SECTIONS_BUSINESS_REPORT.REPORT);
        break;
      case SECTIONS_BUSINESS_REPORT.REPORT:
        setCurrentSection(SECTIONS_BUSINESS_REPORT.END);
        break;
      default:
        console.log("flujo finalizado");
        break;
    }
  };

  const prevSection = () => {
    switch (currentSection) {
      case SECTIONS_BUSINESS_REPORT.REPORT:
        setCurrentSection(SECTIONS_BUSINESS_REPORT.MIRON);
        break;
      case SECTIONS_BUSINESS_REPORT.MIRON:
        setCurrentSection(SECTIONS_BUSINESS_REPORT.SERVICES);
        break;
      case SECTIONS_BUSINESS_REPORT.SERVICES:
        setCurrentSection(SECTIONS_BUSINESS_REPORT.CARDS);
        break;
      case SECTIONS_BUSINESS_REPORT.CARDS:
        setCurrentSection(SECTIONS_BUSINESS_REPORT.DEBTS);
        break;
      case SECTIONS_BUSINESS_REPORT.DEBTS:
        setCurrentSection(SECTIONS_BUSINESS_REPORT.RESUME);
        break;
      default:
        console.log("flujo finalizado");
        break;
    }
  };

  useEffect(() => {
    console.log("current section", currentSection);
    console.log("business sale", businessSale);
    console.log("cards", cards);
  }, [currentSection, businessSale, cards]);

  return (
    <BusinessReportContext.Provider
      value={{
        currentSection,
        isComplete: currentSection === SECTIONS_BUSINESS_REPORT.END,
        nextSection,
        prevSection,
        businessSale,
        setBusinessSale,
        cancelProcess,
        cards,
        setCards,
        saveBusinessSale,
        loading,
        success,
        error,
      }}
    >
      {children}
    </BusinessReportContext.Provider>
  );
};
