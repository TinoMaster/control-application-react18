import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "../../hooks/customs/useLocalStorage";

export const AdminGuard = () => {
  const [role] = useLocalStorage<string>("role", "");

  return role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/app/dashboard" replace />
  );
};
