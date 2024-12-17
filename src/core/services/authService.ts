import { TRegisterOwnerDataModel } from "../models/zod";
import { IRegisterOwnerResponse, IResponse } from "../types/request.types";

/* const urlBase = "http://localhost:3000"; */

class AuthService {
  private urlBase = "http://localhost:3000/auth";

  async registerOwner(
    data: TRegisterOwnerDataModel
  ): Promise<IResponse<IRegisterOwnerResponse>> {
    const response = await fetch(`${this.urlBase}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export const authService = new AuthService();
