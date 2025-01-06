import { apiConfig } from "../config/api.config";
import { ServiceModel } from "../models/api";
import { IResponse } from "../types/request.types";
import { handleFetchError } from "../utilities/helpers/errorManager";
import { requestService } from "./RequestService";

class ServiceService {
  urlAdmin = apiConfig.adminUrl;

  async getServicesByBusinessId(
    id: number
  ): Promise<IResponse<ServiceModel[]>> {
    try {
      return await requestService.fetch<ServiceModel[]>(
        `${this.urlAdmin}/service/list/${id}`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async saveService(service: ServiceModel): Promise<IResponse<ServiceModel>> {
    try {
      return await requestService.fetch<ServiceModel>(
        `${this.urlAdmin}/service`,
        {
          method: "POST",
          body: JSON.stringify(service),
        }
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async deleteService(id: number): Promise<IResponse<null>> {
    try {
      return await requestService.fetch<null>(
        `${this.urlAdmin}/service/${id}`,
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

export const serviceService = new ServiceService();
