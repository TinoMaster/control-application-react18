import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useBusinessContext } from "../../../../../core/context/use/useBusinessContext";
import { useBusinessFinalSale } from "../../../../../core/hooks/useBusinessFinalSale";
import {
  BusinessFinalSaleModel,
  BusinessFinalSaleModelResponse,
  BusinessFinalSaleModelToCreate,
} from "../../../../../core/models/api/businessFinalSale.model";
import { EmployeeModel } from "../../../../../core/models/api/employee.model";
import { MachineModel } from "../../../../../core/models/api/machine.model";
import { businessFinalSaleService } from "../../../../../core/services/businessFinalSaleService";
import { resetBusinessSale } from "../../../../../core/states/actions/businessFinalSaleActions";
import {
  businessFinalSaleReducer,
  initialState,
} from "../../../../../core/states/reducers/businessFinalSaleReducer";
import {
  BusinessReportContext,
  CardPayment,
  SECTIONS_BUSINESS_REPORT,
} from "./useBusinessReportContext";
import { SuccessErrorState } from "../../../../../core/types/global.types";
import { useBoolean } from "../../../../../core/hooks/customs/useBoolean";

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
  success: SuccessErrorState;
  error: SuccessErrorState;
  todayReports: BusinessFinalSaleModelResponse[];
  openModalReport: boolean;
  openDetailSaleModal: boolean;
  setTrueDetailSale: () => void;
  setFalseDetailSale: () => void;
  handleCloseModalReport: () => void;
  setOpenModalReport: React.Dispatch<React.SetStateAction<boolean>>;
  machinesAlreadySelected: () => (number | undefined)[];
  workersAlreadySelected: () => EmployeeModel[];
  onDeleteSale: (sale: BusinessFinalSaleModelResponse) => void;
}

const initialSuccessErrorState: SuccessErrorState = {
  status: false,
  message: "",
};

export const BusinessReportProvider = ({ children }: IContextProps) => {
  const [currentSection, setCurrentSection] = useState(
    SECTIONS_BUSINESS_REPORT.RESUME
  );
  const [state, dispatch] = useReducer(businessFinalSaleReducer, initialState);
  const { business } = useBusinessContext();
  const {
    getTodayReports,
    todayReports,
    machinesAlreadySelected,
    workersAlreadySelected,
  } = useBusinessFinalSale();
  const [cards, setCards] = useState<CardPayment[]>([]);

  const [openModalReport, setOpenModalReport] = useState(false);
  const [
    openDetailSaleModal,
    { setTrue: setTrueDetailSale, setFalse: setFalseDetailSale },
  ] = useBoolean(false);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<SuccessErrorState>(
    initialSuccessErrorState
  );
  const [error, setError] = useState<SuccessErrorState>(
    initialSuccessErrorState
  );

  const handleCloseModalReport = useCallback(() => {
    setOpenModalReport(false);
  }, []);

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
    setError(initialSuccessErrorState);
    setSuccess(initialSuccessErrorState);

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
      await getTodayReports();
      setSuccess({ status: true, message: "Venta guardada exitosamente" });
      setOpenModalReport(false);
    } else {
      setError({ status: true, message: "Error al guardar la venta" });
    }

    setLoading(false);
  }, [business, state, cards, getTodayReports]);

  const onDeleteSale = useCallback(
    async (sale: BusinessFinalSaleModelResponse) => {
      setLoading(true);
      setError(initialSuccessErrorState);
      setSuccess(initialSuccessErrorState);
      const response = await businessFinalSaleService.deleteBusinessFinalSale(
        sale.id as number
      );
      if (response.status === 200) {
        setSuccess({ status: true, message: "Venta eliminada exitosamente" });
        getTodayReports();
        setFalseDetailSale();
      } else {
        setError({ status: true, message: "Error al eliminar la venta" });
      }
      setLoading(false);
    },
    [getTodayReports, setFalseDetailSale]
  );

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
      todayReports,
      openModalReport,
      openDetailSaleModal,
      setTrueDetailSale,
      setFalseDetailSale,
      handleCloseModalReport,
      setOpenModalReport,
      machinesAlreadySelected,
      workersAlreadySelected,
      onDeleteSale,
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
    todayReports,
    setOpenModalReport,
    handleCloseModalReport,
    openModalReport,
    openDetailSaleModal,
    setTrueDetailSale,
    setFalseDetailSale,
    machinesAlreadySelected,
    workersAlreadySelected,
    onDeleteSale,
  ]);

  return (
    <BusinessReportContext.Provider value={contextValue}>
      {children}
    </BusinessReportContext.Provider>
  );
};
