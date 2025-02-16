import { create } from "zustand";
import {
  BusinessFinalSaleModel,
  BusinessFinalSaleModelResponse,
  BusinessFinalSaleModelToCreate,
} from "../../../../../core/models/api/businessFinalSale.model";
import { MachineModel } from "../../../../../core/models/api/machine.model";
import { initialState } from "../../../../../core/states/reducers/businessFinalSaleReducer";
import { useBusinessStore } from "../../../../../core/store/business.store";
import { SECTIONS_BUSINESS_REPORT } from "../context/useBusinessReportContext";
import { IResponse } from "../../../../../core/types/request.types";
import { MutateOptions } from "@tanstack/react-query";

export interface CardPayment {
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
  todayReports: BusinessFinalSaleModelResponse[] | undefined;

  // Actions
  nextSection: () => void;
  prevSection: () => void;
  cancelProcess: () => void;
  setCards: (cards: CardPayment[]) => void;
  saveBusinessSale: (
    saveFunction: (data: BusinessFinalSaleModelToCreate) => void
  ) => void;
  setOpenModalReport: (open: boolean) => void;
  setOpenDetailSaleModal: (open: boolean) => void;
  dispatch: (action: any) => void;
  onDeleteSale: (
    sale: BusinessFinalSaleModelResponse,
    deleteFunction: (
      variables: number,
      options?:
        | MutateOptions<IResponse<boolean>, Error, number, unknown>
        | undefined
    ) => Promise<IResponse<boolean>>
  ) => void;
  setTodayReports: (
    reports: BusinessFinalSaleModelResponse[] | undefined
  ) => void;
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
    todayReports: undefined,

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

    setTodayReports: (
      reports: BusinessFinalSaleModelResponse[] | undefined
    ) => {
      set({ todayReports: reports });
    },

    saveBusinessSale: (saveFunction) => {
      const { businessSale, cards } = get();
      const business = useBusinessStore.getState().business;

      const dataToSave: BusinessFinalSaleModelToCreate = {
        ...businessSale,
        machines: business.machines?.filter((m) =>
          businessSale.machines.includes(m.id!)
        ) as MachineModel[],
        cards: cards.map((card) => ({
          amount: card.amount,
          number: card.cardNumber,
        })),
      };

      saveFunction(dataToSave);
      set({ openModalReport: false });
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

    onDeleteSale: (sale: BusinessFinalSaleModelResponse, deleteFunction) => {
      deleteFunction(sale.id as number, {
        onSuccess: () => {
          set({ openDetailSaleModal: false });
        },
        onError: (error) => {
          console.log(error);
        },
      });
    },
  })
);
