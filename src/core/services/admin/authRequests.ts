import { UserModel } from "../../models/api";
import { IResponse } from "../../types/request.types";
import { handleFetchError } from "../../utilities/helpers/errorManager";

class AuthRequestsService {
  private urlBase = "http://localhost:5000/api/v1/superadmin/auth-requests";

  private getToken(): string | null {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found. User must log in.");
    }
    return token;
  }

  async getRequests(): Promise<IResponse<UserModel[]>> {
    try {
      const response = await fetch(this.urlBase, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.json();
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async acceptRequest(id: number) {
    try {
      const response = await fetch(`${this.urlBase}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.json();
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }

  async rejectRequest(id: number) {
    try {
      const response = await fetch(`${this.urlBase}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    } catch (error: any) {
      console.log(error);
      return handleFetchError(error);
    }
  }
}

export const authRequestsService = new AuthRequestsService();
