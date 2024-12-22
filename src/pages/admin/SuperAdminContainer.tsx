import { PrivateLayout } from "../../components/private";
import { AppProvider } from "../../core/context/implements/appContext";
import { SuperAdminProvider } from "../../core/context/implements/superAdminContext";

function SuperAdminContainer() {
  return (
    <AppProvider>
      <SuperAdminProvider>
        {/* Private Layout lo uso sea para el superAdmin container que para el private container */}
        <PrivateLayout />
      </SuperAdminProvider>
    </AppProvider>
  );
}

export default SuperAdminContainer;
