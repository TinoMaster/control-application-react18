import { PrivateLayout } from "../../components/private";
import { AppProvider } from "../../core/context/implements/appContext";

function PrivateContainer() {
  return (
    <AppProvider>
      <PrivateLayout />
    </AppProvider>
  );
}

export default PrivateContainer;
