import { PrivateLayout } from "../../components/private";
import { AppProvider } from "../../core/context/implements/appContext";
import { BusinessProvider } from "../../core/context/implements/businessContext";

function PrivateContainer() {
  return (
    <AppProvider>
      <BusinessProvider>
        <PrivateLayout />
      </BusinessProvider>
    </AppProvider>
  );
}

export default PrivateContainer;
