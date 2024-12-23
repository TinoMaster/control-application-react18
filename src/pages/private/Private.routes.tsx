import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "../../components/common";
import { lazy } from "react";

const DashBoardPage = lazy(() => import("../private/dashboard/Dashboard"));

export const PrivateRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<DashBoardPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </RoutesWithNotFound>
  );
};
