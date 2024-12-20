import { registerFormToRegisterOwnerMapper } from "../mappers/global.mapper";
import { TLoginSchema, TRegisterOwnerDataModel } from "../models/zod";
import {
  ILoginResponse,
  IRegisterOwnerResponse,
  IResponse,
} from "../types/request.types";
import { handleFetchError } from "../utilities/helpers/errorManager";

class AuthService {
  private urlBase = "http://localhost:5000/api/v1/public";

  async registerOwner(
    data: TRegisterOwnerDataModel
  ): Promise<IResponse<IRegisterOwnerResponse>> {
    try {
      const dataToSend = registerFormToRegisterOwnerMapper(data);
      const response = await fetch(`${this.urlBase}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      return response.json();
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async login(data: TLoginSchema): Promise<IResponse<ILoginResponse>> {
    try {
      const response = await fetch(`${this.urlBase}/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const authService = new AuthService();
