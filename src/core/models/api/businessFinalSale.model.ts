import { DebtModel } from "./debt.model";
import { EmployeeModel } from "./employee.model";
import { MachineModel } from "./machine.model";

export interface BusinessFinalSaleModel {
  id?: number;
  name: string;
  businessId: number;
  total: number;
  paid: number;
  debts: DebtModel[];
  note: string;
  workers: EmployeeModel[];
  machines: MachineModel[];
  found: number;
  createdAt?: Date;
  updatedAt?: Date;
}
