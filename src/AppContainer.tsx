import { PrivateLayout } from "./components/private";
import { AppProvider } from "./core/context/implements/appContext";

function AppContainer() {
  return (
    <AppProvider>
      <PrivateLayout />
    </AppProvider>
  );
}

export default AppContainer;
