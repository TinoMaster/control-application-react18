import { Navigate, Route } from "react-router-dom";
import { Dashboard } from "../private";
import { RoutesWithNotFound } from "../../components/common";

export const PrivateRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </RoutesWithNotFound>
  );
};
