import { DebtModel } from "./debt.model";
import { EmployeeModel } from "./employee.model";

export interface BusinessFinalSaleModel {
  id?: number;
  businessId: number;
  total: number;
  paid: number;
  debts: DebtModel[];
  note: string;
  workers: EmployeeModel[];
  createdAt?: Date;
  updatedAt?: Date;
}
