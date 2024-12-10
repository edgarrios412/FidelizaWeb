import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios"
import { UserContext } from "./utils/context/User/UserContext";
import Login from "./pages/Login";
import Bandeja from "./pages/Profile/Bandeja";
import DetailProcedimiento from "./pages/Profile/DetailProcedimiento";
import Profile from "./pages/Profile";
import NegocioDetail from "./pages/NegocioDetail";
import { CarritoContext } from "./utils/context/Carrito/CarritoContext";

function App() {

  const {cargarCarrito} = useContext(CarritoContext)

  useEffect(() => {
    cargarCarrito()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/negocio/:id" element={<NegocioDetail />} />
      </Routes>
    </>
  );
}

export default App;
