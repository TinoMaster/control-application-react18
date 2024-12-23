import { UserModel } from "../../models/api";
import { IResponse } from "../../types/request.types";
import { handleFetchError } from "../../utilities/helpers/errorManager";
import { requestService } from "../RequestService";

class AuthRequestsService {
  private urlBase = "http://localhost:5000/api/v1/superadmin/auth-requests";

  async getRequests(): Promise<IResponse<UserModel[]>> {
    try {
      return await requestService.fetch<UserModel[]>(this.urlBase);
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async acceptRequest(id: number): Promise<IResponse<any>> {
    try {
      return await requestService.fetch<any>(`${this.urlBase}/${id}`, {
        method: "PUT",
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async rejectRequest(id: number): Promise<IResponse<any>> {
    try {
      return await requestService.fetch<any>(`${this.urlBase}/${id}`, {
        method: "DELETE",
      });
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const authRequestsService = new AuthRequestsService();
