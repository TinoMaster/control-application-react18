import { UserRegisterModel } from "../models/api";
import { IRegisterOwnerResponse, IResponse } from "../types/request.types";

/* const urlBase = "http://localhost:3000"; */

class AuthService {
  private urlBase = "http://localhost:3000/api/v1/public";

  async registerOwner(
    data: UserRegisterModel
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
