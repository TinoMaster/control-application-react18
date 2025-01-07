import { DebtModel } from "./debt.model";
import { EmployeeModel } from "./employee.model";
import { ServiceSaleModel } from "./serviceSale.model";

export interface BusinessFinalSaleModel {
  id?: number;
  name: string;
  businessId: number;
  total: number;
  paid: number;
  debts: DebtModel[];
  note: string;
  workers: EmployeeModel[];
  machines: number[];
  servicesSales: ServiceSaleModel[];
  doneBy: number;
  found: number;
  createdAt?: Date;
  updatedAt?: Date;
}
