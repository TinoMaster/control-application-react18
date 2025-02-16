import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useBoolean } from "../../../../../core/hooks/customs/useBoolean";
import { useBusinessFinalSale } from "../../../../../core/hooks/useBusinessFinalSale";
import {
  BusinessFinalSaleModel,
  BusinessFinalSaleModelResponse,
  BusinessFinalSaleModelToCreate,
} from "../../../../../core/models/api/businessFinalSale.model";
import { EmployeeModel } from "../../../../../core/models/api/employee.model";
import { MachineModel } from "../../../../../core/models/api/machine.model";
import { resetBusinessSale } from "../../../../../core/states/actions/businessFinalSaleActions";
import {
  businessFinalSaleReducer,
  initialState,
} from "../../../../../core/states/reducers/businessFinalSaleReducer";
import { useBusinessStore } from "../../../../../core/store/business.store";
import {
  BusinessReportContext,
  CardPayment,
  SECTIONS_BUSINESS_REPORT,
} from "./useBusinessReportContext";

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
  loadingTodayReports: boolean;
  loadingSave: boolean;
  loadingDelete: boolean;
  cards: CardPayment[];
  setCards: React.Dispatch<React.SetStateAction<CardPayment[]>>;
  saveBusinessSale: () => void;
  todayReports: BusinessFinalSaleModelResponse[] | undefined;
  openModalReport: boolean;
  openDetailSaleModal: boolean;
  setTrueDetailSale: () => void;
  setFalseDetailSale: () => void;
  handleCloseModalReport: () => void;
  setOpenModalReport: React.Dispatch<React.SetStateAction<boolean>>;
  machinesAlreadySelected: () => (number | undefined)[] | undefined;
  workersAlreadySelected: () => EmployeeModel[] | undefined;
  onDeleteSale: (sale: BusinessFinalSaleModelResponse) => void;
}

//TODO: implementar el poder hacer reportes con varias fechas diferentes
export const BusinessReportProvider = ({ children }: IContextProps) => {
  const [currentSection, setCurrentSection] = useState(
    SECTIONS_BUSINESS_REPORT.RESUME
  );
  const [state, dispatch] = useReducer(businessFinalSaleReducer, initialState);
  const business = useBusinessStore((state) => state.business);
  const {
    todayReports,
    loadingTodayReports,
    machinesAlreadySelected,
    workersAlreadySelected,
    saveBusinessFinalSale,
    loadingSave,
    deleteBusinessFinalSale,
    loadingDelete,
  } = useBusinessFinalSale();
  const [cards, setCards] = useState<CardPayment[]>([]);

  const [openModalReport, setOpenModalReport] = useState(false);
  const [
    openDetailSaleModal,
    { setTrue: setTrueDetailSale, setFalse: setFalseDetailSale },
  ] = useBoolean(false);

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

  const saveBusinessSale = useCallback(() => {
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

    saveBusinessFinalSale(dataToSave, {
      onSuccess: () => {
        setOpenModalReport(false);
      },
    });
  }, [state, business, cards, saveBusinessFinalSale, setOpenModalReport]);

  const onDeleteSale = useCallback(
    (sale: BusinessFinalSaleModelResponse) => {
      deleteBusinessFinalSale(sale.id as number, {
        onSuccess: () => {
          setFalseDetailSale();
        },
        onError: (error: any) => {
          console.log(error);
        },
      });
    },
    [deleteBusinessFinalSale, setFalseDetailSale]
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
      loadingTodayReports,
      loadingSave,
      loadingDelete,
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
    nextSection,
    prevSection,
    saveBusinessSale,
    dispatch,
    cancelProcess,
    todayReports,
    loadingTodayReports,
    loadingSave,
    loadingDelete,
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
