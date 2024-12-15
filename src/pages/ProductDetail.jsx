import ModalLogin from "@/components/layout/ModalLogin"
import ImageBg from "../assets/name.png"
import moneda from "../assets/moneda.png"
import favicon from "/favicon.png"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, ArrowRight, Mails, MessageCircle, MessageSquareWarning, Phone, ShoppingBasket, Ticket } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { CarritoContext } from "@/utils/context/Carrito/CarritoContext"
import { Button } from "@/components/ui/button"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductDetail = ({product, volver, id}) => {

    const navigate = useNavigate()
    const [negocio, setNegocio] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { carrito, setCarrito, agregarCarrito, quitarDelCarrito } = useContext(CarritoContext)

    const { toast } = useToast()

    return (
        <>
            {negocio && <div className={`bg-[#f2f5ff] h-[100vh]`}>
                {/* TAREA: TESTEAR SI FUNCIONA */}
                <div className={`bg-blue-500 w-full h-56 absolute`}>
                    {/* {negocio?.background.at(0) != "#" && <img className={`w-full h-full`} src={negocio.background} />} */}
                </div>
                <div className={`flex flex-row items-center justify-between  px-6 py-4`}>
                    <button
                        className={`px-1 py-2 z-30 mt-16`}
                        onClick={() => volver()}
                    >
                        <ArrowLeft color="white" size={24} />
                    </button>
                    <div className={`flex flex-row gap-4`}>
                        <button>
                            {/* <IconFeather color={"transparent"} name={"more-vertical"} size={20} /> */}
                        </button>
                    </div>
                </div>
                <div className={`flex flex-row flex-wrap my-0 px-6`}>
                    <div
                        className={`flex flex-col z-30 justify-center items-center w-full rounded-lg overflow-hidden py-3 my-3`}
                    >
                        <div className="relative w-28 h-28 rounded-full">
                        <img
                            src={product.image}
                            onLoad={() => {setIsLoading(false)}}
                            className={`w-full bg-white h-full object-cover rounded-full border-4 border-white transition-opacity duration-500`}
                        />
                        </div>
                        <div className="relative h-20 mt-2 w-36 text-center">
                        <span className={`font-semibold text-xl mt-2 text-black transition-opacity duration-500`}>
                            {product.name}
                        </span>
                    </div>
                    </div>

                    {/* {negocio?.products?.filter(p => (!p.onlyClaimable && p.price) || p.onlyClaimable).length > 0 && <ProgressBar puntos={negocio?.userNegocioPoints?.puntos ?? 0} puntosMax={negocio?.products.sort((a, b) => a.price - b.price)[0].price} />} */}
                    <div className={`bg-white rounded-lg shadow-sm p-6 mb-6 w-full`}>
                        <span className={`font-bold text-lg text-[#222B45] mb-1 block`}>
                            Descripción
                        </span>
                        <span className={`text-gray-500 mb-1 block`} style={{ whiteSpace: "pre-wrap"}}>
                            {product.desc}
                        </span>
                        <span className={`font-bold block`}>$ {product.value.toLocaleString()}</span>
                        <div className={`flex flex-row items-center gap-1 mt-6`}>
                                        <img
                                            src={moneda}
                                            className={`w-4 h-4`}
                                        />
                                        <span className={`text-sm text-blue-500 font-bold block`}>Por tu compra recibes {product.value/1000} puntos</span>
                                    </div>
                    </div>
                    <div className="flex gap-16 items-center justify-center w-full">
                                            <Button className="h-16 w-full bg-blue-500 font-bold text-base hover:bg-blue-600" onClick={() => quitarDelCarrito({ productoId: product.id, tiendaId: id })}>-</Button>
                                            <p className="font-bold text-xl">{carrito.find(c => c.tiendaId == id && c.productoId == product.id)?.cantidad ?? 0}</p>
                                            <Button className="h-16 w-full bg-blue-500 font-bold text-base hover:bg-blue-600" onClick={() => agregarCarrito({ productoId: product.id, tiendaId: id, cantidad: 1, imagen: product.image, precio: product.value, nombre: product.name, nombreTienda: negocio.name })}>+</Button>
                                        </div>
                    <div className={`rounded-lg mb-6 w-full`}>
                        {/* <span className={`text-gray-500 mb-1`}>A continuación verás una lista de articulos o descuentos que puedes obtener con tus puntos acumulados</span> */}
                        <div className={`flex flex-row gap-3 my-4`}>
                            {negocio?.products?.filter(p => !p.onlyClaimable).map(p => <div className="flex-col items-center max-w-40 lg:w-96 rounded-lg shadow-md bg-white dark:bg-[#262635] shadow-slate-200 dark:shadow-gray-900 pb-4">
                                    <div className="rounded-lg w-28 h-28 overflow-hidden m-auto">
                                        <img src={p.image} alt="Imagen" className="object-cover h-full m-auto" />
                                    </div>
                                    <div className="text-left px-6">
                                        {/* <p className="text-slate-500 mb-2">El mejor pollo de la ciudad</p> */}
                                        <div className="flex">
                                            {/* <Timer className="w-4 h-4 text-slate-500 mr-1" /> */}
                                            <p className="text-sm my-1">{p.name}</p>
                                        </div>
                                        <h2 className="font-bold mb-4">${p.value.toLocaleString()} </h2>
                                        <div className="flex gap-2 items-center justify-center">
                                            <Button className="h-6 w-full bg-blue-500 font-bold text-base hover:bg-blue-600" onClick={() => quitarDelCarrito({ productoId: p.id, tiendaId: id })}>-</Button>
                                            <p className="font-bold">{carrito.find(c => c.tiendaId == id && c.productoId == p.id)?.cantidad ?? 0}</p>
                                            <Button className="h-6 w-full bg-blue-500 font-bold text-base hover:bg-blue-600" onClick={() => agregarCarrito({ productoId: p.id, tiendaId: id, cantidad: 1, imagen: p.image, precio: p.value, nombre: p.name, nombreTienda: negocio.name })}>+</Button>
                                        </div>
                                    </div>
                                </div>)}
                        </div>
                    </div>
                    {negocio?.products?.filter(p => (!p.onlyClaimable && p.price) || p.onlyClaimable).length > 0 && <span className={`font-bold text-lg text-[#222B45] mb-1 block`}>
                        Redime tus puntos
                    </span>}
                    <div className={`rounded-lg mb-6 w-full`}>
                        {/* <span className={`text-gray-500 mb-1`}>A continuación verás una lista de articulos o descuentos que puedes obtener con tus puntos acumulados</span> */}
                        <div className={`flex flex-col gap-3 my-4`}>
                            {negocio?.products?.filter(p => (!p.onlyClaimable && p.price) || p.onlyClaimable).map(p => <div
                                key={p.id}
                                disabled={negocio?.userNegocioPoints?.puntos >= p.price ? false : true}
                                // onPress={() => navigation.navigate("Canjear")}
                                className={`bg-white flex flex-row items-center rounded-lg shadow-sm p-4 w-full gap-4`}
                            >
                                <div className={`w-20 h-20 flex items-center`}>
                                    <img
                                        src={p.image}
                                        className={`w-full`}
                                    />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className={`text-[#222B45] font-bold mb-0 block`}>
                                        {p.name}
                                    </span>
                                    <div className={`flex flex-row items-center gap-1`}>
                                        <img
                                            src={moneda}
                                            className={`w-4 h-4`}
                                        />
                                        <span className={`text-sm text-blue-500 font-bold block`}>{p.price}</span>
                                    </div>
                                    <span className={`text-slate-600 mt-0 block`}>Valor</span>
                                    <span className={`font-bold block`}>$ {p.value.toLocaleString()}</span>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default ProductDetail