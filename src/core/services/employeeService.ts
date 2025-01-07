import { apiConfig } from "../config/api.config";
import { EmployeeModel } from "../models/api/employee.model";
import { IResponse } from "../types/request.types";
import { handleFetchError } from "../utilities/helpers/errorManager";
import { requestService } from "./RequestService";

class EmployeeService {
  private urlBase = apiConfig.baseUrl;

  async getEmployees(): Promise<IResponse<EmployeeModel[]>> {
    try {
      return await requestService.fetch<EmployeeModel[]>(
        `${this.urlBase}/superadmin/employees`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getEmployeeByUserId(id: number): Promise<IResponse<EmployeeModel>> {
    try {
      return await requestService.fetch<EmployeeModel>(
        `${this.urlBase}/private/employees/byUserId/${id}`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getEmployeeById(id: string): Promise<IResponse<EmployeeModel>> {
    try {
      return await requestService.fetch<EmployeeModel>(
        `${this.urlBase}/admin/employees/${id}`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getEmployeesByBusinessId(
    id: number
  ): Promise<IResponse<EmployeeModel[]>> {
    try {
      return await requestService.fetch<EmployeeModel[]>(
        `${this.urlBase}/admin/employees/byBusiness/${id}`
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

  async deleteEmployee(id: string): Promise<IResponse<null>> {
    try {
      return await requestService.fetch<null>(
        `${this.urlBase}/admin/employees/${id}`,
        {
          method: "DELETE",
        }
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const employeeService = new EmployeeService();
