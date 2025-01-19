import { DebtModel } from "./debt.model";
import { EmployeeModel } from "./employee.model";
import { MachineModel } from "./machine.model";
import { ServiceSaleModel } from "./serviceSale.model";

export interface BusinessFinalSaleModelResponse {
  id?: number;
  name: string;
  business: number;
  total: number;
  paid: number;
  debts: DebtModel[];
  note: string;
  workers: EmployeeModel[];
  machines: MachineModel[];
  servicesSales: ServiceSaleModel[];
  doneBy: number;
  found: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BusinessFinalSaleModel {
  id?: number;
  name: string;
  business: number;
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

export interface BusinessFinalSaleModelToCreate {
  name: string;
  business: number;
  total: number;
  paid: number;
  debts: DebtModel[];
  note: string;
  workers: EmployeeModel[];
  machines: MachineModel[];
  servicesSales: ServiceSaleModel[];
  doneBy: number;
  found: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const transformBusinessSaleToBusinessSaleResponse = (
  businessSale: BusinessFinalSaleModel,
  machines: MachineModel[]
): BusinessFinalSaleModelResponse => {
  return {
    ...businessSale,
    machines: machines.filter((m) =>
      businessSale.machines.includes(m.id!)
    ) as MachineModel[],
  };
};
