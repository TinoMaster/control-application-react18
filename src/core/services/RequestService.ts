import { IResponse } from "../types/request.types";

// requestService.ts
class RequestService {
  private getToken(): string | null {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found. User must log in.");
    }
    return token;
  }

  private getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getToken()}`,
    };
  }

  async fetch<T>(url: string, options: RequestInit = {}): Promise<IResponse<T>> {
    const headers = this.getHeaders();
    const response = await fetch(url, { ...options, headers });
    return response.json();
  }
}

export const requestService = new RequestService();
