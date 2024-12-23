import { UserModel } from "../../models/api";
import { IResponse } from "../../types/request.types";
import { handleFetchError } from "../../utilities/helpers/errorManager";
import { requestService } from "../RequestService";

class ClientsService {
  private urlBase = "http://localhost:5000/api/v1";

  async getClients(): Promise<IResponse<UserModel[]>> {
    try {
      return await requestService.fetch<UserModel[]>(`${this.urlBase}/superadmin/users`);
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async getClientById(id: string): Promise<IResponse<UserModel>> {
    try {
      return await requestService.fetch<UserModel>(`${this.urlBase}/private/users/${id}`);
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const clientsService = new ClientsService();
