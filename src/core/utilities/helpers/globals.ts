import { CardPayment } from "../../../pages/private/reports/business-report/store/businessReport.store";
import { CardModel } from "../../models/api/card.model";
import { EmployeeModel } from "../../models/api/employee.model";

export const transformCardModelToCardPayment = (
  card: CardModel
): CardPayment => {
  return {
    id: card?.id?.toString() || crypto.randomUUID(),
    amount: card.amount,
    cardNumber: card.number,
  };
};

export const getTotalSalaryFromEmployees = (
  total: number,
  employees: EmployeeModel[]
) => {
  return employees.reduce((acc, e) => {
    return (
      acc +
      (e.percentSalary > 0 ? e.percentSalary * total : 0) +
      (e.fixedSalary || 0)
    );
  }, 0);
};

export const filterActiveEmployees = (
  employees: EmployeeModel[]
): EmployeeModel[] => {
  return employees.filter((e) => e.user.active);
};

export const filterEmployeesReadyToWork = (
  employees: EmployeeModel[]
): EmployeeModel[] => {
  return employees.filter((e) => {
    return e.user.active && (e.percentSalary > 0 || e.fixedSalary > 0);
  });
};
