import { apiConfig } from "../config/api.config";
import { BusinessModel } from "../models/api";
import { IResponse } from "../types/request.types";
import { handleFetchError } from "../utilities/helpers/errorManager";
import { requestService } from "./RequestService";

class BusinessService {
  private urlBase = apiConfig.baseUrl;

  async getBusinesses(): Promise<IResponse<BusinessModel[]>> {
    try {
      return await requestService.fetch<BusinessModel[]>(
        `${this.urlBase}/superadmin/businesses`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getBusinessById(id: string): Promise<IResponse<BusinessModel>> {
    try {
      return await requestService.fetch<BusinessModel>(
        `${this.urlBase}/owner/businesses/${id}`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async saveBusiness(
    business: BusinessModel
  ): Promise<IResponse<BusinessModel>> {
    try {
      return await requestService.fetch<BusinessModel>(
        `${this.urlBase}/owner/businesses`,
        {
          method: "POST",
          body: JSON.stringify(business),
        }
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const businessService = new BusinessService();
