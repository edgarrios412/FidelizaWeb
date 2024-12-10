import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import { NavigationProvider } from "./utils/context/Navigation/NavigationProvider.jsx";
import axios from "axios";
import { UserProvider } from "./utils/context/User/UserProvider.jsx";
import { Toaster } from "./components/ui/toaster.jsx";
import { CarritoProvider } from "./utils/context/Carrito/CarritoProvider.jsx";
import NavBar from "./components/layout/NavBar.jsx";

axios.defaults.baseURL = "https://fideliza-back.onrender.com";
// axios.defaults.baseURL = 'http://localhost:3001';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <CarritoProvider>
        <Toaster />
        <NavigationProvider>
          <NavBar/>
          <App />
        </NavigationProvider>
      </CarritoProvider>
    </UserProvider>
  </BrowserRouter>
);
