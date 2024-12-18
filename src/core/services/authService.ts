import { registerFormToRegisterOwnerMapper } from "../mappers/global.mapper";
import { TRegisterOwnerDataModel } from "../models/zod";
import { IRegisterOwnerResponse, IResponse } from "../types/request.types";

/* const urlBase = "http://localhost:3000"; */

class AuthService {
  private urlBase = "http://localhost:5000/api/v1/public";

  async registerOwner(
    data: TRegisterOwnerDataModel
  ): Promise<IResponse<IRegisterOwnerResponse>> {
    const dataToSend = registerFormToRegisterOwnerMapper(data);
    const response = await fetch(`${this.urlBase}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    return response.json();
  }
}

export const authService = new AuthService();
