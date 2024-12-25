import { ReactNode } from "react";
import { TRole } from "../models/api";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode; // Los componentes hijos
  allowedRoles: string[]; // Los roles permitidos para esta ruta
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const role: TRole = localStorage.getItem("role") as TRole;

  if (allowedRoles.includes(role)) {
    return <>{children}</>;
  } else {
    return <Navigate to="/app/dashboard" replace />;
  }
};

export default PrivateRoute;
