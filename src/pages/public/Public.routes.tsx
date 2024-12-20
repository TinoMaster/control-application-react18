import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "../../components/common";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../public/home/Home"));
const LoginPage = lazy(() => import("../public/login/LoginPage"));
const RegisterOwnerPage = lazy(
  () => import("../public/register/RegisterOwner")
);

export const PublicRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterOwnerPage />} />
      </RoutesWithNotFound>
    </Suspense>
  );
};
