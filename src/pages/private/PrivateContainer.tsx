import { PrivateLayout } from "../../components/private";
import { AppProvider } from "../../core/context/implements/appContext";
import { AppThemeProvider } from "../../core/context/implements/themeContext";

function PrivateContainer() {
  return (
    <AppProvider>
      <AppThemeProvider>
        <PrivateLayout />
      </AppThemeProvider>
    </AppProvider>
  );
}

export default PrivateContainer;
