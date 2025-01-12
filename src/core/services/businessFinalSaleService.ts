import { apiConfig } from "../config/api.config";
import { IResponse } from "../types/request.types";
import { handleFetchError } from "../utilities/helpers/errorManager";
import { requestService } from "./RequestService";

class BusinessFinalSaleService {
  private adminUrl = apiConfig.adminUrl;

  async existEmployeeInAnyBusinessFinalSale(
    employeeId: number
  ): Promise<IResponse<boolean>> {
    try {
      return await requestService.fetch<boolean>(
        `${this.adminUrl}/business-final-sale/exist-employee/${employeeId}`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const businessFinalSaleService = new BusinessFinalSaleService();
