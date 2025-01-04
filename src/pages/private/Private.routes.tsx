import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "../../components/common";
import { lazy } from "react";
import PrivateRoute from "../../core/guards/routes.guard";
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
const EmployeeDetailPage = lazy(
  () => import("../private/employees/detail-employee/EmployeeDetail")
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
const BusinessDetailPage = lazy(
  () => import("./businesses/business-detail/BusinessDetail")
);
/* Reports */
const ReportsLayoutPage = lazy(() => import("./reports/ReportsLayout"));
const BusinessReportPage = lazy(
  () => import("./reports/business-report/BusinessReport")
);
/* Inventory */
const InventoryLayoutPage = lazy(() => import("./inventory/InventoryLayout"));
const BusinessInventoryPage = lazy(
  () => import("./inventory/business/BusinessInventory")
);
const StoreInventoryPage = lazy(
  () => import("./inventory/store/StoreInventory")
);
/* consumables */
const ConsumablesLayoutPage = lazy(
  () => import("./consumables/ConsumableLayout")
);
const BusinessConsumablesPage = lazy(
  () => import("./consumables/business/BusinessConsumables")
);
const StoreConsumablesPage = lazy(
  () => import("./consumables/store/StoreConsumables")
);
/* Services */
const ServicesLayoutPage = lazy(() => import("./services/ServiceLayout"));
const BusinessServicesPage = lazy(
  () => import("./services/business/BusinessServices")
);
const StoreServicesPage = lazy(() => import("./services/store/StoreServices"));

export const PrivateRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<DashBoardPage />} />
      {/* Employees */}
      <Route
        path="employees"
        element={
          <PrivateRoute allowedRoles={[ERole.OWNER, ERole.ADMIN]}>
            <EmployeesLayoutPage />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="list" replace />} />
        <Route path="list" element={<EmployeesListPage />} />
        <Route path="new" element={<NewEmployeePage />} />
        <Route path=":id" element={<EmployeeDetailPage />} />
      </Route>
      {/* Business */}
      <Route
        path="businesses"
        element={
          <PrivateRoute allowedRoles={[ERole.OWNER]}>
            <BusinessesLayoutPage />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="list" replace />} />
        <Route path="list" element={<BusinessesListPage />} />
        <Route path="new" element={<NewBusinessPage />} />
        <Route path=":id" element={<BusinessDetailPage />} />
      </Route>
      {/* Reports */}
      <Route
        path="reports"
        element={
          <PrivateRoute
            allowedRoles={[ERole.OWNER, ERole.ADMIN, ERole.EMPLOYEE]}
          >
            <ReportsLayoutPage />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="business" replace />} />
        <Route path="business" element={<BusinessReportPage />} />
      </Route>
      {/* Inventory */}
      <Route
        path="inventory"
        element={
          <PrivateRoute allowedRoles={[ERole.OWNER, ERole.ADMIN]}>
            <InventoryLayoutPage />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="business" replace />} />
        <Route path="business" element={<BusinessInventoryPage />} />
        <Route path="store" element={<StoreInventoryPage />} />
      </Route>
      {/* Consumables */}
      <Route
        path="consumables"
        element={
          <PrivateRoute allowedRoles={[ERole.OWNER, ERole.ADMIN]}>
            <ConsumablesLayoutPage />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="business" replace />} />
        <Route path="business" element={<BusinessConsumablesPage />} />
        <Route path="store" element={<StoreConsumablesPage />} />
      </Route>
      {/* Services */}
      <Route
        path="services"
        element={
          <PrivateRoute allowedRoles={[ERole.OWNER, ERole.ADMIN]}>
            <ServicesLayoutPage />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="business" replace />} />
        <Route path="business" element={<BusinessServicesPage />} />
        <Route path="store" element={<StoreServicesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/404" replace />} />
    </RoutesWithNotFound>
  );
};
