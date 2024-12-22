import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { PublicLayout } from "./components/public";
import PrivateContainer from "./pages/private/PrivateContainer";
import { useAuthContext } from "./core/context/use/useAuthContext";
import { ERole } from "./core/models/api";
import SuperAdminContainer from "./pages/admin/SuperAdminContainer";

function App() {
  const { isLoggedIn, role } = useAuthContext();

  const privateContainerToRender = () => {
    if (role === ERole.SUPERADMIN) {
      return <SuperAdminContainer />;
    } else {
      return <PrivateContainer />;
    }
  };

  return (
    <BrowserRouter>
      {!isLoggedIn ? <PublicLayout /> : privateContainerToRender()}
    </BrowserRouter>
  );
}

export default App;
