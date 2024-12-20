import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { PrivateLayout } from "./components/private";
import { PublicLayout } from "./components/public";

function App() {
  const token = localStorage.getItem("token");
  const isLogged = token ? true : false;

  return (
    <BrowserRouter>
      {isLogged ? <PrivateLayout /> : <PublicLayout />}
    </BrowserRouter>
  );
}

export default App;
