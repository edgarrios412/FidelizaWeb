import { useEffect, useState } from "react";
import { CarritoContext } from "./CarritoContext"

export const CarritoProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([])
    // const updateUsuario = () => {
    //     const token = localStorage.getItem("token")
    //     if(!token) return setUsuario(null)
    //     axios.get("/user/token/"+token)
    //     .then(({data}) => setUsuario(data))
    // }

    useEffect(() => {
        localStorage.setItem("carrito",JSON.stringify(carrito))
    },[carrito])

    const cargarCarrito = () => {
        const carritoExtraido = localStorage.getItem("carrito")
        setCarrito(JSON.parse(carritoExtraido))
    }

    const agregarCarrito = (producto) => {
        // const nombreTienda = tiendas.find(t => t.id == producto.tiendaId).nombre
        if (carrito.length) {
            const productoBuscado = carrito.find(c => c.productoId == producto.productoId && c.tiendaId == producto.tiendaId);
            if (productoBuscado) {
                productoBuscado.cantidad++;
                setCarrito([...carrito])
            } else {
                setCarrito([...carrito, {...producto}]);
            }
        } else {
            setCarrito([{...producto}]);
        }
    }

    const quitarDelCarrito = (producto) => {
        if (carrito.length) {
            const productoBuscado = carrito.find(c => c.productoId == producto.productoId && c.tiendaId == producto.tiendaId);
            console.log(productoBuscado)
            if (productoBuscado?.cantidad > 1) {
                productoBuscado.cantidad--;
                setCarrito([...carrito])
            } else {
                setCarrito(carrito.filter(c => c !== productoBuscado));
            }
        }
    }

    return (
        <CarritoContext.Provider value={{ carrito, setCarrito, agregarCarrito, quitarDelCarrito, cargarCarrito}}>
            {children}
        </CarritoContext.Provider>
    )
}