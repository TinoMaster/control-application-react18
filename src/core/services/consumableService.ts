import { apiConfig } from "../config/api.config";
import { ConsumableModel } from "../models/api/consumables.model";
import { IResponse } from "../types/request.types";
import { handleFetchError } from "../utilities/helpers/errorManager";
import { requestService } from "./RequestService";

class ConsumableService {
  private urlAdmin = apiConfig.adminUrl;

  async saveConsumable(
    consumable: ConsumableModel
  ): Promise<IResponse<ConsumableModel>> {
    try {
      return await requestService.fetch<ConsumableModel>(
        `${this.urlAdmin}/consumable`,
        {
          method: "POST",
          body: JSON.stringify(consumable),
        }
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const consumableService = new ConsumableService();
