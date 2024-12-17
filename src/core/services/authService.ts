import { TRegisterOwnerDataModel } from "../models/zod";

/* const urlBase = "http://localhost:3000"; */

class AuthService {
  async registerOwner(data: TRegisterOwnerDataModel) {
    console.log(data);
  }
}

export const authService = new AuthService();
