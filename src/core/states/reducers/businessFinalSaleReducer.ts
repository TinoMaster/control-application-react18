import { BusinessFinalSaleModel } from "../../models/api/businessFinalSale.model";
import {
  BusinessFinalSaleActionTypes,
  RESET_SALE,
  SAVE_BUSINESS_ID,
  SAVE_NAME,
  SET_DEBTS,
  SET_DONE_BY,
  SET_FOUND,
  SET_MACHINES,
  SET_NOTE,
  SET_SERVICES,
  SET_WORKERS,
  UPDATE_PAID,
  UPDATE_TOTAL,
} from "../types/businessFinalSale.types";

export const initialState: BusinessFinalSaleModel = {
  name: "",
  business: 0,
  total: 0,
  paid: 0,
  debts: [],
  note: "",
  workers: [],
  machines: [],
  servicesSales: [],
  doneBy: 0,
  found: 0,
};

export const businessFinalSaleReducer = (
  state: BusinessFinalSaleModel = initialState,
  action: BusinessFinalSaleActionTypes
): BusinessFinalSaleModel => {
  switch (action.type) {
    case SAVE_NAME:
      return {
        ...state,
        name: action.payload,
      };

    case SAVE_BUSINESS_ID:
      return {
        ...state,
        business: action.payload,
      };

    case UPDATE_TOTAL:
      return {
        ...state,
        total: action.payload,
      };

    case UPDATE_PAID:
      return {
        ...state,
        paid: action.payload,
      };

    case SET_DEBTS:
      return {
        ...state,
        debts: action.payload,
      };

    case SET_NOTE:
      return {
        ...state,
        note: action.payload,
      };

    case SET_WORKERS:
      return {
        ...state,
        workers: action.payload,
      };

    case SET_MACHINES:
      return {
        ...state,
        machines: action.payload,
      };

    case SET_SERVICES:
      return {
        ...state,
        servicesSales: action.payload,
      };

    case SET_DONE_BY:
      return {
        ...state,
        doneBy: action.payload,
      };

    case SET_FOUND:
      return {
        ...state,
        found: action.payload,
      };

    case RESET_SALE:
      return initialState;

    default:
      return state;
  }
};
