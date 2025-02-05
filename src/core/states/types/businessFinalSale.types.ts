import { DebtModel } from "../../models/api/debt.model";
import { EmployeeModel } from "../../models/api/employee.model";
import { ServiceSaleModel } from "../../models/api/serviceSale.model";

// Action Types Interfaces
export interface SaveNameAction {
  type: typeof SAVE_NAME;
  payload: string;
}

export interface SaveBusinessIdAction {
  type: typeof SAVE_BUSINESS_ID;
  payload: number;
}

export interface UpdateTotalAction {
  type: typeof UPDATE_TOTAL;
  payload: number;
}

export interface UpdatePaidAction {
  type: typeof UPDATE_PAID;
  payload: number;
}

export interface SetDebtsAction {
  type: typeof SET_DEBTS;
  payload: DebtModel[];
}

export interface SetNoteAction {
  type: typeof SET_NOTE;
  payload: string;
}

export interface SetWorkersAction {
  type: typeof SET_WORKERS;
  payload: EmployeeModel[];
}

export interface SetMachinesAction {
  type: typeof SET_MACHINES;
  payload: number[];
}

export interface SetServicesAction {
  type: typeof SET_SERVICES;
  payload: ServiceSaleModel[];
}

export interface SetDoneByAction {
  type: typeof SET_DONE_BY;
  payload: number;
}

export interface SetFoundAction {
  type: typeof SET_FOUND;
  payload: number;
}

export interface ResetSaleAction {
  type: typeof RESET_SALE;
}

// Union Type for all possible actions
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

// Action Type Constants
export const SAVE_NAME = "SAVE_NAME";
export const SAVE_BUSINESS_ID = "SAVE_BUSINESS_ID";
export const UPDATE_TOTAL = "UPDATE_TOTAL";
export const UPDATE_PAID = "UPDATE_PAID";
export const SET_DEBTS = "SET_DEBTS";
export const SET_NOTE = "SET_NOTE";
export const SET_WORKERS = "SET_WORKERS";
export const SET_MACHINES = "SET_MACHINES";
export const SET_SERVICES = "SET_SERVICES";
export const SET_DONE_BY = "SET_DONE_BY";
export const SET_FOUND = "SET_FOUND";
export const RESET_SALE = "RESET_SALE";
