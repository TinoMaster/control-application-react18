import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "../../components/common";
import { Dashboard } from "../private";

export const PrivateRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </RoutesWithNotFound>
  );
};
