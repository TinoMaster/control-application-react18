import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { PublicLayout } from "./components/public";
import AppContainer from "./AppContainer";

function App() {
  const token = localStorage.getItem("token");
  const isLogged = token ? true : false;

  return (
    <BrowserRouter>
      {isLogged ? <AppContainer /> : <PublicLayout />}
    </BrowserRouter>
  );
}

export default App;
