import { create } from "zustand";
import { BusinessFinalSaleModel } from "../../../../../core/models/api/businessFinalSale.model";
import { initialState } from "../../../../../core/states/reducers/businessFinalSaleReducer";
import { SECTIONS_BUSINESS_REPORT } from "./data/businessReport.data";

export interface CardPayment {
  id: string;
  cardNumber: string;
  amount: number;
}

interface BusinessReportState {
  // State
  currentSection: string;
  businessSale: BusinessFinalSaleModel;
  cards: CardPayment[];
  openModalReport: boolean;
  openDetailSaleModal: boolean;
  isComplete: boolean;

  // Actions
  nextSection: () => void;
  prevSection: () => void;
  cancelProcess: () => void;
  setCards: (cards: CardPayment[]) => void;

  setOpenModalReport: (open: boolean) => void;
  setOpenDetailSaleModal: (open: boolean) => void;
  dispatch: (action: any) => void;
}

export const useBusinessReportStore = create<BusinessReportState>(
  (set, get) => ({
    // Initial state
    currentSection: SECTIONS_BUSINESS_REPORT.RESUME,
    businessSale: initialState,
    cards: [],
    openModalReport: false,
    openDetailSaleModal: false,
    isComplete: false,

    // Actions
    nextSection: () => {
      const currentSection = get().currentSection;
      let nextSection = currentSection;

      switch (currentSection) {
        case SECTIONS_BUSINESS_REPORT.RESUME:
          nextSection = SECTIONS_BUSINESS_REPORT.DEBTS;
          break;
        case SECTIONS_BUSINESS_REPORT.DEBTS:
          nextSection = SECTIONS_BUSINESS_REPORT.CARDS;
          break;
        case SECTIONS_BUSINESS_REPORT.CARDS:
          nextSection = SECTIONS_BUSINESS_REPORT.SERVICES;
          break;
        case SECTIONS_BUSINESS_REPORT.SERVICES:
          nextSection = SECTIONS_BUSINESS_REPORT.MIRON;
          break;
        case SECTIONS_BUSINESS_REPORT.MIRON:
          nextSection = SECTIONS_BUSINESS_REPORT.REPORT;
          break;
        case SECTIONS_BUSINESS_REPORT.REPORT:
          nextSection = SECTIONS_BUSINESS_REPORT.END;
          break;
      }

      set({
        currentSection: nextSection,
        isComplete: nextSection === SECTIONS_BUSINESS_REPORT.END,
      });
    },

    prevSection: () => {
      const currentSection = get().currentSection;
      let prevSection = currentSection;

      switch (currentSection) {
        case SECTIONS_BUSINESS_REPORT.REPORT:
          prevSection = SECTIONS_BUSINESS_REPORT.MIRON;
          break;
        case SECTIONS_BUSINESS_REPORT.MIRON:
          prevSection = SECTIONS_BUSINESS_REPORT.SERVICES;
          break;
        case SECTIONS_BUSINESS_REPORT.SERVICES:
          prevSection = SECTIONS_BUSINESS_REPORT.CARDS;
          break;
        case SECTIONS_BUSINESS_REPORT.CARDS:
          prevSection = SECTIONS_BUSINESS_REPORT.DEBTS;
          break;
        case SECTIONS_BUSINESS_REPORT.DEBTS:
          prevSection = SECTIONS_BUSINESS_REPORT.RESUME;
          break;
      }

      set({ currentSection: prevSection });
    },

    cancelProcess: () => {
      set({
        currentSection: SECTIONS_BUSINESS_REPORT.RESUME,
        businessSale: initialState,
        cards: [],
      });
    },

    setCards: (cards: CardPayment[]) => {
      set({ cards });
    },

    setOpenModalReport: (open: boolean) => {
      set({ openModalReport: open });
    },

    setOpenDetailSaleModal: (open: boolean) => {
      set({ openDetailSaleModal: open });
    },

    dispatch: (action: any) => {
      set((state) => ({
        businessSale: {
          ...state.businessSale,
          ...action.payload,
        },
      }));
    },
  })
);
