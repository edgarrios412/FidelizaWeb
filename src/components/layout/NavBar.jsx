import { useContext, useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
// import Rifavo from "../icons/branding/Rifavo"
import { Badge } from "../ui/badge"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowDownToLine, CalendarDays, History, LogOut, QrCode, ShoppingBasket, ShoppingCart, Ticket, Trophy, User } from "lucide-react"
// import { ModeToggle } from "../mode-toggle"
// import RifavoLight from "../icons/branding/RifavoLight"
// import { precioDolar } from "@/utils/helpers/precioDolar"
import { useLocation, useNavigate } from "react-router-dom"
import { CarritoContext } from "@/utils/context/Carrito/CarritoContext"
import imageBg from "../../assets/name.png"

const NavBar = () => {
    const [busqueda, setBusqueda] = useState("")
    const { carrito, setCarrito, quitarDelCarrito } = useContext(CarritoContext)
    const navigate = useNavigate()
    const location = useLocation()

    const vaciarCarrito = () => {
        setCarrito([])
    }

    const buscarProducto = (e) => {
        const busqueda = e.target.value
        setBusqueda(e.target.value)
        if(busqueda.length >= 1){
            // alert(busqueda)
            return navigate("/buscar/"+busqueda)
        }else{
            return navigate("/")
        }
    }

    useEffect(() => {
        if(location.pathname.includes("/buscar/")){
            const palabra = location.pathname.split("/buscar/")[1]
            setBusqueda(palabra.includes("%20") ? palabra.replace("%20"," ") : palabra)
        }
    },[])

    return (
        <>
            <div className="fixed w-full h-16 flex items-center px-8 lg:px-20 justify-between bg-white dark:bg-[#262635] bg-opacity-95 z-50">
                <div className="relative flex">
                    <a onClick={() => navigate("/")} className="relative cursor-pointer">
                        <div className="h-full w-32 sm:w-40 flex items-center">
                          <img className={"w-36"} src={imageBg} />
                        </div>
                    </a>
                    {/* <div className="sm:relative sm:left-52">
                        <ModeToggle />
                    </div>
                    <div className="sm:relative sm:left-52 ml-2">
                        <Input onChange={buscarProducto} value={busqueda} name="email" placeholder="Buscar productos" />
                    </div> */}
                </div>
                <Sheet>
                    <SheetTrigger className="ml-2 relative inline-flex items-center">
                        <ShoppingBasket className="w-8 h-8 sm:w-10 sm:h-10 -y-10" />
                        <Badge className="absolute inline-flex items-center justify-center h-5 w-5 sm:w-6 sm:h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-5 -end-1 sm:top-6 sm:-end-2 dark:border-gray-900" variant="destructive">{carrito.length}</Badge>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:w-full">
                        <SheetHeader>
                            <SheetTitle>Carrito de compras</SheetTitle>
                            <SheetDescription>
                                Actualmente para hacer el pedido necesitas tener Whatsapp para enviar el pedido y ser procesado por FidelizApp
                            </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col gap-5 mt-6 max-h-80 min-h-80 overflow-auto mb-10">
                            {!carrito.length && <h3 className="text-gray-500 flex items-center text-sm justify-center mt-20"><ShoppingCart className="w-4 h-4 mr-2"/> El carrito está vacío</h3>}
                            {carrito.map((c,i) => 
                            <div key={i} className="flex gap-2 justify-between items-center">
                                <div className="flex gap-2 items-center">
                                <div className="rounded-lg w-16 h-16 overflow-hidden">
                                    <img src={c.imagen} alt="Imagen" className="object-cover h-full m-auto" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{c.nombre}</p>
                                    <h2 className="font-bold text-sm my-1">${c.precio.toLocaleString()} <span className="text-sm text-gray-600 font-normal"> x {c.cantidad}</span></h2>
                                </div>
                                </div>
                                <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => quitarDelCarrito({productoId:c.productoId, tiendaId:c.tiendaId})}>Quitar</Button>
                            </div>)}
                        </div>
                        {carrito.length > 0 && <div>
                            <h2 className="font-bold text-lg">Total: ${carrito.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0).toLocaleString()}</h2>
                            <a href={`https://api.whatsapp.com/send/?phone=573118268264&text=Detalles del pedido%0A%0A${carrito.reduce((acc, curr) => acc+`${curr.nombreTienda} - ${curr.nombre} x${curr.cantidad}%0A`,"")}%0ATotal a pagar: $${carrito.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0).toLocaleString()}`} target="_blank"><Button className="mt-2 w-full  bg-blue-500 hover:bg-blue-600">Hacer pedido</Button></a>
                        </div>}
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

export default NavBar