import { create } from "zustand";
import { ERole, TRole, UserModel } from "../models/api";
import { EmployeeModel } from "../models/api/employee.model";
import { employeeService } from "../services/employeeService";
import { userService } from "../services/userService";
import { decodeJWT } from "../utilities/helpers/jwtDecode";
import { useBusinessStore } from "./business.store";

interface AuthState {
  user: UserModel | undefined;
  employee: EmployeeModel | undefined;
  role: TRole;
  loadingUser: boolean;
  token: string | null;
  isLoggedIn: boolean;

  // Actions
  login: (token: string, role: TRole, refreshToken: string) => void;
  logout: () => void;
  reloadUser: () => Promise<void>;
  getUser: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: undefined,
  employee: undefined,
  role: localStorage.getItem("role") as TRole,
  loadingUser: false,
  token: localStorage.getItem("token"),
  isLoggedIn: Boolean(
    localStorage.getItem("token") && localStorage.getItem("role")
  ),

  login: (token: string, role: TRole, refreshToken: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("refreshToken", refreshToken);
    set({ token, role, isLoggedIn: true });
    const userEmail = decodeJWT(token).sub;
    console.log(userEmail);
    if (userEmail) {
      get().getUser(userEmail);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("refreshToken");
    set({
      user: undefined,
      employee: undefined,
      role: undefined as unknown as TRole,
      token: null,
      isLoggedIn: false,
    });
    window.location.href = "/login";
  },

  reloadUser: async () => {
    const token = get().token;
    if (token) {
      const userEmail = decodeJWT(token).sub;
      if (userEmail) {
        await get().getUser(userEmail);
      }
    }
  },

  getUser: async (email: string) => {
    set({ loadingUser: true });
    try {
      const response = await userService.getUser(email);
      if (response.status === 200 && response.data) {
        useBusinessStore.getState().initializeBusiness(response.data);
        set({ user: response.data });

        const role = get().role;
        if (role !== ERole.SUPERADMIN && role !== ERole.OWNER) {
          const employeeResponse = await employeeService.getEmployeeByUserId(
            response.data?.id || 0
          );
          if (employeeResponse.status === 200) {
            set({ employee: employeeResponse.data });
          }
        }
      } else {
        get().logout();
      }
    } catch (error: any) {
      console.log(error);
      get().logout();
    } finally {
      set({ loadingUser: false });
    }
  },
}));
