import { apiConfig } from "../config/api.config";
import { BusinessFinalSaleModel } from "../models/api/businessFinalSale.model";
import { IResponse } from "../types/request.types";
import { handleFetchError } from "../utilities/helpers/errorManager";
import { requestService } from "./RequestService";

class BusinessFinalSaleService {
  private adminUrl = apiConfig.adminUrl;
  private privateUrl = apiConfig.privateUrl;

  async existEmployeeInAnyBusinessFinalSale(
    employeeId: string
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

  async saveBusinessFinalSale(
    businessSale: BusinessFinalSaleModel
  ): Promise<IResponse<null>> {
    try {
      return await requestService.fetch<null>(
        `${this.privateUrl}/business-final-sale`,
        {
          method: "POST",
          body: JSON.stringify(businessSale),
        }
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const businessFinalSaleService = new BusinessFinalSaleService();
