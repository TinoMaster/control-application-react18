import { apiConfig } from "../config/api.config";
import { ThemeModel } from "../models/api/theme.model";
import { IResponse } from "../types/request.types";
import { handleFetchError } from "../utilities/helpers/errorManager";
import { requestService } from "./RequestService";

class AppThemeService {
  private privateUrl = apiConfig.privateUrl;

  async getThemes(): Promise<IResponse<ThemeModel[]>> {
    try {
      return await requestService.fetch<ThemeModel[]>(
        `${this.privateUrl}/theme`
      );
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const appThemeService = new AppThemeService();
