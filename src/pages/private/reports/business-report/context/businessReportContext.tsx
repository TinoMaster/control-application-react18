import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useBusinessContext } from "../../../../../core/context/use/useBusinessContext";
import {
  BusinessFinalSaleModel,
  BusinessFinalSaleModelToCreate,
} from "../../../../../core/models/api/businessFinalSale.model";
import { MachineModel } from "../../../../../core/models/api/machine.model";
import { businessFinalSaleService } from "../../../../../core/services/businessFinalSaleService";
import {
  businessFinalSaleReducer,
  initialState,
} from "../../../../../core/states/reducers/businessFinalSaleReducer";
import {
  BusinessReportContext,
  CardPayment,
  SECTIONS_BUSINESS_REPORT,
} from "./useBusinessReportContext";
import { resetBusinessSale } from "../../../../../core/states/actions/businessFinalSaleActions";

interface IContextProps {
  children: ReactNode;
}

export interface IBusinessReportContext {
  currentSection: string;
  nextSection: () => void;
  prevSection: () => void;
  isComplete: boolean;
  businessSale: BusinessFinalSaleModel;
  dispatch: React.Dispatch<any>;
  cancelProcess: () => void;
  cards: CardPayment[];
  setCards: React.Dispatch<React.SetStateAction<CardPayment[]>>;
  saveBusinessSale: () => void;
  loading: boolean;
  success: boolean;
  error: boolean;
}

export const BusinessReportProvider = ({ children }: IContextProps) => {
  const [currentSection, setCurrentSection] = useState(
    SECTIONS_BUSINESS_REPORT.RESUME
  );
  const [state, dispatch] = useReducer(businessFinalSaleReducer, initialState);
  const { business } = useBusinessContext();
  const [cards, setCards] = useState<CardPayment[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const cancelProcess = useCallback(() => {
    setCurrentSection(SECTIONS_BUSINESS_REPORT.RESUME);
    dispatch(resetBusinessSale());
  }, []);

  const nextSection = useCallback(() => {
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
  }, [currentSection]);

  const prevSection = useCallback(() => {
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
  }, [currentSection]);

  const saveBusinessSale = useCallback(async () => {
    setLoading(true);
    setError(false);
    setSuccess(false);

    const dataToSave: BusinessFinalSaleModelToCreate = {
      ...state,
      machines: business.machines?.filter((m) =>
        state.machines.includes(m.id!)
      ) as MachineModel[],
      cards: cards.map((card) => ({
        amount: card.amount,
        number: card.cardNumber,
      })),
    };

    const response = await businessFinalSaleService.saveBusinessFinalSale(
      dataToSave
    );

    if (response.status === 200) {
      nextSection();
      setSuccess(true);
    } else {
      setError(true);
    }

    setLoading(false);
  }, [business, state, cards, nextSection]);

  useEffect(() => {
    console.log("current section", currentSection);
    console.log("business sale", state);
    console.log("cards", cards);
  }, [currentSection, state, cards]);

  const contextValue = useMemo(() => {
    return {
      currentSection,
      isComplete: currentSection === SECTIONS_BUSINESS_REPORT.END,
      nextSection,
      prevSection,
      businessSale: state,
      dispatch,
      cancelProcess,
      cards,
      setCards,
      saveBusinessSale,
      loading,
      success,
      error,
    };
  }, [
    currentSection,
    state,
    cards,
    loading,
    success,
    error,
    nextSection,
    prevSection,
    saveBusinessSale,
    dispatch,
    cancelProcess,
  ]);

  return (
    <BusinessReportContext.Provider value={contextValue}>
      {children}
    </BusinessReportContext.Provider>
  );
};
