import { apiConfig } from "../config/api.config";
import { ILoginResponse, IResponse } from "../types/request.types";

// requestService.ts
class RequestService {
  private redirectToLogin() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("refreshToken");

    alert("Sesión expirada. Por favor, inicia sesión nuevamente.");

    window.location.href = "/login";
  }

  private getToken(): string | null {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found. User must log in.");
    }
    return token;
  }

  private getRefreshToken(): string | null {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("Refresh token not found. User must log in.");
    }
    return refreshToken;
  }

  private async refreshAccessToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();

    try {
      const response = await fetch(`${apiConfig.baseUrl}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh access token");
      }

      const res: IResponse<ILoginResponse> = await response.json();
      console.log(res);
      const newAccessToken = res.data?.token;

      if (!newAccessToken) {
        throw new Error("Access token not found in response");
      }
      localStorage.setItem("token", newAccessToken);

      return newAccessToken;
    } catch {
      this.redirectToLogin();
      throw new Error("Failed to refresh access token");
    }
  }

  private async getHeadersWithValidToken(): Promise<HeadersInit> {
    let token = this.getToken();

    if (!token) {
      throw new Error("Token not found. User must log in.");
    }

    const isTokenExpired = this.isTokenExpired(token);

    if (isTokenExpired) {
      token = await this.refreshAccessToken();
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  private isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000;
      return Date.now() >= exp;
    } catch {
      return true;
    }
  }

  async fetch<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<IResponse<T>> {
    const headers = await this.getHeadersWithValidToken();

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Si el token ha expirado y no se pudo renovar
    if (response.status === 401) {
      throw new Error("Token expired. User must log in.");
    }

    return response.json();
  }
}

export const requestService = new RequestService();
