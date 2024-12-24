import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "../../components/common";
import { lazy } from "react";
import AdminRoute from "../../core/guards/admin.guard";
import { ERole } from "../../core/models/api";

const DashBoardPage = lazy(() => import("../private/dashboard/Dashboard"));
/* Employees */
const EmployeesLayoutPage = lazy(() => import("./employees/EmployeesLayout"));
const NewEmployeePage = lazy(
  () => import("../private/employees/new-employee/NewEmployee")
);
const EmployeesListPage = lazy(
  () => import("../private/employees/list-employees/EmployeesList")
);
/* Business */
const BusinessesLayoutPage = lazy(
  () => import("./businesses/BusinessesLayout")
);
const NewBusinessPage = lazy(
  () => import("./businesses/businesses-new/NewBusiness")
);
const BusinessesListPage = lazy(
  () => import("./businesses/businesses-list/BusinessesList")
);

export const PrivateRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<DashBoardPage />} />
      {/* Employees */}
      <Route
        path="employees"
        element={
          <AdminRoute allowedRoles={[ERole.OWNER, ERole.ADMIN]}>
            <EmployeesLayoutPage />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="list" replace />} />
        <Route path="list" element={<EmployeesListPage />} />
        <Route path="new" element={<NewEmployeePage />} />
      </Route>
      {/* Business */}
      <Route
        path="businesses"
        element={
          <AdminRoute allowedRoles={[ERole.OWNER, ERole.ADMIN]}>
            <BusinessesLayoutPage />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="list" replace />} />
        <Route path="list" element={<BusinessesListPage />} />
        <Route path="new" element={<NewBusinessPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/404" replace />} />
    </RoutesWithNotFound>
  );
};
