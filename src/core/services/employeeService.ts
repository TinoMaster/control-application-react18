import { apiConfig } from "../config/api.config";
import { EmployeeModel } from "../models/api/employee";
import { IResponse } from "../types/request.types";
import { handleFetchError } from "../utilities/helpers/errorManager";
import { requestService } from "./RequestService";

class EmployeeService {
  private urlBase = apiConfig.baseUrl;

  async getEmployees(): Promise<IResponse<EmployeeModel[]>> {
    try {
      return await requestService.fetch<EmployeeModel[]>(
        `${this.urlBase}/admin/employees`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async saveEmployee(
    employee: EmployeeModel
  ): Promise<IResponse<EmployeeModel>> {
    try {
      return await requestService.fetch<EmployeeModel>(
        `${this.urlBase}/admin/employees`,
        {
          method: "POST",
          body: JSON.stringify(employee),
        }
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const employeeService = new EmployeeService();
