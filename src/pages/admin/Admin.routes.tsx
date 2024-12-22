import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "../../components/common";
import { lazy } from "react";

const AuthRequestsPage = lazy(() => import("./auth-requests/AuthRequests"));

export const SuperAdminRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to="/auth-requests" replace />} />
      <Route path="auth-requests" element={<AuthRequestsPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </RoutesWithNotFound>
  );
};
