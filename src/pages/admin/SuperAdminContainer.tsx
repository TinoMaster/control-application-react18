import { PrivateLayout } from "../../components/private";
import { AppProvider } from "../../core/context/implements/appContext";
import { BusinessProvider } from "../../core/context/implements/businessContext";
import { SuperAdminProvider } from "../../core/context/implements/superAdminContext";

function SuperAdminContainer() {
  return (
    <AppProvider>
      <SuperAdminProvider>
        <BusinessProvider>
          {/* Private Layout lo uso sea para el superAdmin container que para el private container */}
          <PrivateLayout />
        </BusinessProvider>
      </SuperAdminProvider>
    </AppProvider>
  );
}

export default SuperAdminContainer;
