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
import ProductDetail from "./ProductDetail"

const NegocioDetail = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [negocio, setNegocio] = useState([])
    const [productSelected, setProductSelected] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const { carrito, setCarrito, agregarCarrito, quitarDelCarrito } = useContext(CarritoContext)

    useEffect(() => {
        axios.get("/negocio/byId/" + id).then(({ data }) => setNegocio(data))
    }, [])

    const { toast } = useToast()

    if(productSelected) return <ProductDetail product={productSelected} id={id} volver={() => setProductSelected(null)}/>

    return (
        <>
            {negocio && <div className={`bg-[#f2f5ff] h-100%`}>
                {/* TAREA: TESTEAR SI FUNCIONA */}
                <div className={`bg-blue-500 w-full h-56 absolute`}>
                    {/* {negocio?.background.at(0) != "#" && <img className={`w-full h-full`} src={negocio.background} />} */}
                </div>
                <div className={`flex flex-row items-center justify-between  px-6 py-4`}>
                    <button
                        className={`px-1 py-2 z-30 mt-16`}
                        onClick={() => navigate("/")}
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
                        {isLoading && <Skeleton circle className="absolute top-0 left-0 w-full h-full bg-gray-200 border-4 border-white"/>}
                        <img
                            src={negocio.image}
                            onLoad={() => {setIsLoading(false)}}
                            className={`w-full h-full object-cover rounded-full border-4 border-white transition-opacity duration-500 ${
                                isLoading ? "opacity-0" : "opacity-100"
                              }`}
                        />
                        </div>
                        {/* <div className={`bg-transparent`}> */}
                        <div className="relative h-7 mt-2 w-36 text-center">
                        {isLoading && <Skeleton className="absolute top-0 left-0 w-full h-full my-1"/>}
                        <span className={`font-semibold text-xl mt-2 text-black transition-opacity duration-500 ${
                                isLoading ? "opacity-0" : "opacity-100"
                              }`}>
                            {negocio.name}
                        </span>
                        </div>
                        {/* <span className={`font-semibold text-xl mt-2 text-black`}>
                            {negocio.name}
                        </span> */}
                        <div className="relative h-5 my-1 flex flex-col items-center w-64">
                        {isLoading && <Skeleton className="absolute top-0 left-0 w-full h-full my-1"/>}
                        <span className={`font-semibold text-sm mt-1 text-slate-600 transition-opacity duration-500 ${
                                isLoading ? "opacity-0" : "opacity-100"
                              }`}>
                            {negocio.direction}
                        </span>
                        </div>
                        {/* <span className={`font-semibold text-sm mt-1 text-slate-600`}>
                            {negocio.direction}
                        </span> */}
                        <div className="relative h-5 my-1 flex flex-col items-center w-36">
                        {isLoading && <Skeleton className="absolute top-0 left-0 h-full my-1 w-full"/>}
                        <div className={`text-slate-600 flex flex-row mt-0 gap-1 items-center transition-opacity duration-500 ${
                                isLoading ? "opacity-0" : "opacity-100"
                              }`}>
                            <Phone size={12} />
                            <span className={`font-medium text-sm mt-0 text-slate-600`}>{negocio.phone}</span>
                        </div>
                        </div>
                        {/* <div className={`text-slate-600 flex flex-row mt-1 gap-1 items-center`}>
                            <Phone size={12} />
                            <span className={`font-medium text-sm mt-0 text-slate-600`}>{negocio.phone}</span>
                        </div> */}
                    </div>
                    <div className={`flex flex-row gap-4 justify-center mb-8 w-full`}>
                        {/* <a
                            target="_blank"
                            href={`https://wa.me/${negocio.countryCode}${negocio.phone}`}
                            className={`cursor-pointer flex flex-row gap-2 justify-center items-center bg-green-200 rounded-lg px-3 py-1`}
                        >
                            <Mails
                                size={16}
                                color="green"
                            />
                            <span className={`font-semibold text-green-600 text-sm mt-0`}>Contactar</span>
                        </a> */}
                        <a
                            href={`https://wa.me/573022536253?text=Hola, quisiera reportar un error en el negocio: ${negocio.name}`}
                            target="_blank"
                            className={`cursor-pointer flex flex-row gap-2 justify-center items-center bg-red-200 rounded-lg px-3 py-1`}
                        >
                            {/* <Icon style={tw`text-xl text-[#7ACEFA]`} name="users" /> */}
                            <MessageSquareWarning
                                size={16}
                                color="red"
                            />
                            <span className={`font-semibold text-red-600 text-sm mt-0`}>Reportar error</span>
                        </a>
                    </div>

                    {/* {negocio?.products?.filter(p => (!p.onlyClaimable && p.price) || p.onlyClaimable).length > 0 && <ProgressBar puntos={negocio?.userNegocioPoints?.puntos ?? 0} puntosMax={negocio?.products.sort((a, b) => a.price - b.price)[0].price} />} */}
                    <div className={`bg-white rounded-lg shadow-sm p-6 mb-6 w-full`}>
                        <span className={`font-bold text-lg text-[#222B45] mb-1 block`}>
                            Obten puntos
                        </span>
                        <span className={`text-gray-500 mb-1 block`}>
                            Puedes obtener puntos de las siguientes maneras, puede variar en
                            cada negocio
                        </span>
                        <div className={`flex flex-col gap-4 my-4`}>
                            <div className={`flex flex-row gap-3 items-center`}>
                                <ShoppingBasket className={`text-[#E8899E]`} size={20} />
                                <div>
                                    <span className={`text-[#222B45] font-bold block`}>Comprando</span>
                                    <span className={`text-sm text-[#6B779A] block`}>
                                        Por cada $1.000 recibe 1 punto
                                    </span>
                                </div>
                            </div>
                            <div className={`flex flex-row gap-3 items-center`}>
                                <Ticket className={`text-[#7ACEFA]`} size={20} />
                                <div>
                                    <span className={`text-[#222B45] font-bold block`}>Sorteos</span>
                                    <span className={`text-sm text-[#6B779A] block`}>
                                        Este negocio puede sortear puntos
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#f2f5ff] w-full pb-4 px-0">
                        <a
                            // href="/fidelizaV2.aab" download target="_blank"
                            onClick={() => toast({
                                variant: "destructive",
                                title: "Link no disponible"
                            })}
                            className="bg-blue-500 px-6 py-4 rounded-xl shadow-sm flex gap-4 items-center cursor-pointer">
                            <img className={"h-14"} src={favicon} />
                            <div>
                                <span className="font-bold block mb-1 text-white">Descarga nuestra aplicación</span>
                                <span className="text-sm text-white line-clamp-2">Para reclamar recompensas debes hacerlo desde nuestra aplicación móvil</span>
                            </div>
                        </a>
                    </div>
                    {negocio?.products?.filter(p => !p.onlyClaimable).length > 0 && <span className={`font-bold text-lg text-[#222B45] mb-1 block`}>
                        Catálogo
                    </span>}
                    <div className={`rounded-lg mb-6 w-full`}>
                        {/* <span className={`text-gray-500 mb-1`}>A continuación verás una lista de articulos o descuentos que puedes obtener con tus puntos acumulados</span> */}
                        <div className={`flex flex-row gap-3 my-4`}>
                            {negocio?.products?.filter(p => !p.onlyClaimable).map(p => <div className="flex-col items-center max-w-40 lg:w-96 rounded-lg shadow-md bg-white dark:bg-[#262635] shadow-slate-200 dark:shadow-gray-900 pb-4">
                                    <div onClick={() => setProductSelected(p)} className="cursor-pointer rounded-lg w-28 h-28 overflow-hidden m-auto">
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

export default NegocioDetail