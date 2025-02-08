import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "../../hooks/customs/useLocalStorage";

export const PrivateGuard = () => {
  const [token] = useLocalStorage<string>("token", "");

  return token !== "" ? <Outlet /> : <Navigate to="/login" replace />;
};
