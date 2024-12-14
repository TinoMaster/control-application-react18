import { Navigate, Route, Routes } from "react-router-dom";
import { NotFound404 } from "../../common";

interface Props {
  children: React.ReactNode;
}

export const RoutesWithNotFound = ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route path="/404" element={<NotFound404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
