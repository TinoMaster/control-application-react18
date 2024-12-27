import { PrivateLayout } from "../../components/private";
import { AppProvider } from "../../core/context/implements/appContext";
import { BusinessProvider } from "../../core/context/implements/businessContext";
import { AppThemeProvider } from "../../core/context/implements/themeContext";

function PrivateContainer() {
  return (
    <AppProvider>
      <BusinessProvider>
        <AppThemeProvider>
          <PrivateLayout />
        </AppThemeProvider>
      </BusinessProvider>
    </AppProvider>
  );
}

export default PrivateContainer;
