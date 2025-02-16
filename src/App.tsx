import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { NotificationProvider } from "./core/context/NotificationContext";
import { ERole } from "./core/models/api";
import { useAuthStore } from "./core/store/auth.store";
import SuperAdminContainer from "./pages/admin/SuperAdminContainer";
import PrivateContainer from "./pages/private/PrivateContainer";
import PublicContainer from "./pages/public/PublicContainer";

function App() {
  const role = useAuthStore((state) => state.role);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const privateContainerToRender = () => {
    if (role === ERole.SUPERADMIN) {
      return <SuperAdminContainer />;
    } else {
      return <PrivateContainer />;
    }
  };

  return (
    <NotificationProvider>
      <BrowserRouter>
        {!isLoggedIn ? <PublicContainer /> : privateContainerToRender()}
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
