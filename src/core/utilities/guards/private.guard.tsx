import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "../hooks";

export const PrivateGuard = () => {
  const [token] = useLocalStorage<string>("token", "");

  return token !== "" ? <Outlet /> : <Navigate to="/login" replace />;
};
