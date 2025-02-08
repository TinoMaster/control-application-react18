import { PrivateLayout } from "../../components/private";
import { AppProvider } from "../../core/context/implements/appContext";
import { BusinessProvider } from "../../core/context/implements/businessContext";
import { SalesProvider } from "../../core/context/implements/SalesContext";
import { AppThemeProvider } from "../../core/context/implements/themeContext";

function PrivateContainer() {
  return (
    <AppProvider>
      <BusinessProvider>
        <SalesProvider>
          <AppThemeProvider>
            <PrivateLayout />
          </AppThemeProvider>
        </SalesProvider>
      </BusinessProvider>
    </AppProvider>
  );
}

export default PrivateContainer;
