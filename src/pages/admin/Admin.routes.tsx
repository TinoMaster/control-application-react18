import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "../../components/common";
import { lazy } from "react";

const AuthRequestsPage = lazy(() => import("./auth-requests/AuthRequests"));
const AdminDashboardPage = lazy(() => import("./dashboard/AdminDashboard"));
const AdminClientsPage = lazy(() => import("./clients/AdminClients"));
const ClientPage = lazy(() => import("./clients/client/Client"));

export const SuperAdminRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to="/auth-requests" replace />} />
      <Route path="auth-requests" element={<AuthRequestsPage />} />
      <Route path="dashboard" element={<AdminDashboardPage />} />
      <Route path="clients" element={<AdminClientsPage />} />
      <Route path="clients/:id" element={<ClientPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </RoutesWithNotFound>
  );
};
