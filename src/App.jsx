import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import Login from "./pages/Login";
import NegocioDetail from "./pages/NegocioDetail";
import { CarritoContext } from "./utils/context/Carrito/CarritoContext";
import Admin from "./pages/Admin";

function App() {

  const {cargarCarrito} = useContext(CarritoContext)

  useEffect(() => {
    cargarCarrito()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/edgarrios412" element={<Admin />} />
        <Route path="/negocio/:id" element={<NegocioDetail />} />
      </Routes>
    </>
  );
}

export default App;
