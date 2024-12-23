import { UserModel } from "../../models/api";
import { IResponse } from "../../types/request.types";
import { handleFetchError } from "../../utilities/helpers/errorManager";
import { requestService } from "../RequestService";

class ClientsService {
  private urlBase = "http://localhost:5000/api/v1/superadmin/users";

  async getClients(): Promise<IResponse<UserModel[]>> {
    try {
      return await requestService.fetch<UserModel[]>(this.urlBase);
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const clientsService = new ClientsService();
