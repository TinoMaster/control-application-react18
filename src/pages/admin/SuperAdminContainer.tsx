import { PrivateLayout } from "../../components/private";
import { AppProvider } from "../../core/context/implements/appContext";
import { SuperAdminProvider } from "../../core/context/implements/superAdminContext";
import { AppThemeProvider } from "../../core/context/implements/themeContext";

function SuperAdminContainer() {
  return (
    <AppProvider>
      <SuperAdminProvider>
        {/* Private Layout lo uso sea para el superAdmin container que para el private container */}
        <AppThemeProvider>
          <PrivateLayout />
        </AppThemeProvider>
      </SuperAdminProvider>
    </AppProvider>
  );
}

export default SuperAdminContainer;
