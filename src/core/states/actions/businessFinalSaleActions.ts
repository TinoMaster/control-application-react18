import { DebtModel } from "../../models/api/debt.model";
import { EmployeeModel } from "../../models/api/employee.model";
import { ServiceSaleModel } from "../../models/api/serviceSale.model";
import {
  RESET_SALE,
  ResetSaleAction,
  SAVE_BUSINESS_ID,
  SAVE_NAME,
  SaveBusinessIdAction,
  SaveNameAction,
  SET_DEBTS,
  SET_DONE_BY,
  SET_FOUND,
  SET_MACHINES,
  SET_NOTE,
  SET_SERVICES,
  SET_WORKERS,
  SetDebtsAction,
  SetDoneByAction,
  SetFoundAction,
  SetMachinesAction,
  SetNoteAction,
  SetServicesAction,
  SetWorkersAction,
  UPDATE_PAID,
  UPDATE_TOTAL,
  UpdatePaidAction,
  UpdateTotalAction,
} from "../types/businessFinalSale.types";

// Action Creators
export const updateBusinessSaleName = (name: string): SaveNameAction => ({
  type: SAVE_NAME,
  payload: name,
});

export const updateBusinessSaleBusinessId = (
  businessId: number
): SaveBusinessIdAction => ({
  type: SAVE_BUSINESS_ID,
  payload: businessId,
});

export const updateBusinessSaleTotal = (total: number): UpdateTotalAction => ({
  type: UPDATE_TOTAL,
  payload: total,
});

export const updateBusinessSalePaid = (paid: number): UpdatePaidAction => ({
  type: UPDATE_PAID,
  payload: paid,
});

export const updateBusinessSaleDebts = (
  debts: DebtModel[]
): SetDebtsAction => ({
  type: SET_DEBTS,
  payload: debts,
});

export const updateBusinessSaleNote = (note: string): SetNoteAction => ({
  type: SET_NOTE,
  payload: note,
});

export const updateBusinessSaleWorkers = (
  workers: EmployeeModel[]
): SetWorkersAction => ({
  type: SET_WORKERS,
  payload: workers,
});

export const updateBusinessSaleMachines = (
  machines: number[]
): SetMachinesAction => ({
  type: SET_MACHINES,
  payload: machines,
});

export const updateBusinessSaleServices = (
  services: ServiceSaleModel[]
): SetServicesAction => ({
  type: SET_SERVICES,
  payload: services,
});

export const updateBusinessSaleDoneBy = (doneBy: number): SetDoneByAction => ({
  type: SET_DONE_BY,
  payload: doneBy,
});

export const updateBusinessSaleFound = (found: number): SetFoundAction => ({
  type: SET_FOUND,
  payload: found,
});

export const resetBusinessSale = (): ResetSaleAction => ({
  type: RESET_SALE,
});

export type BusinessFinalSaleActionTypes =
  | SaveNameAction
  | SaveBusinessIdAction
  | UpdateTotalAction
  | UpdatePaidAction
  | SetDebtsAction
  | SetNoteAction
  | SetWorkersAction
  | SetMachinesAction
  | SetServicesAction
  | SetDoneByAction
  | SetFoundAction
  | ResetSaleAction;
