import { PrivateLayout } from "../../components/private";
import { AppProvider } from "../../core/context/implements/appContext";
import { SalesProvider } from "../../core/context/implements/SalesContext";
import { AppThemeProvider } from "../../core/context/implements/themeContext";

function PrivateContainer() {
  return (
    <AppProvider>
      <SalesProvider>
        <AppThemeProvider>
          <PrivateLayout />
        </AppThemeProvider>
      </SalesProvider>
    </AppProvider>
  );
}

export default PrivateContainer;
