import { handleFetchError } from "../../utilities/helpers/errorManager";

class AuthRequestsService {
  private urlBase = "http://localhost:5000/api/v1/admin/auth-requests";

  async getRequests() {
    try {
      const response = await fetch(this.urlBase, {
        method: "GET",
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

  async acceptRequest(id: number) {
    try {
      const response = await fetch(`${this.urlBase}/${id}`, {
        method: "PUT",
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
