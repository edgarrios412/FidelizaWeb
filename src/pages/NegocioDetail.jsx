import ModalLogin from "@/components/layout/ModalLogin"
import ImageBg from "../assets/name.png"
import moneda from "../assets/moneda.png"
import favicon from "/favicon.png"
import { useEffect, useState } from "react"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, ArrowRight, Phone, ShoppingBasket, Ticket } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

const NegocioDetail = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [negocio, setNegocio] = useState([])

    useEffect(() => {
        axios.get("/negocio/byId/" + id).then(({ data }) => setNegocio(data))
    }, [])

    const { toast } = useToast()

    return (
        <>
            {negocio && <div className={`bg-[#f2f5ff] h-100%`}>
                {/* TAREA: TESTEAR SI FUNCIONA */}
                <div className={`bg-blue-500 w-full h-40 absolute`}>
                    {/* {negocio?.background.at(0) != "#" && <img className={`w-full h-full`} src={negocio.background} />} */}
                </div>
                <div className={`flex flex-row items-center justify-between  px-6 py-4`}>
                    <button
                        className={`px-1 py-2 z-30`}
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
                        <img
                            src={negocio.image}
                            className={`h-28 w-28 border-4 border-white rounded-full`}
                        />
                        {/* <div className={`bg-transparent`}> */}
                        <span className={`font-semibold text-xl mt-2 text-black`}>
                            {negocio.name}
                        </span>
                        <span className={`font-semibold text-sm mt-1 text-slate-600`}>
                            {negocio.direction}
                        </span>
                        <div className={`text-slate-600 flex flex-row mt-1 gap-1 items-center`}>
                            <Phone size={12} />
                            <span className={`font-medium text-sm mt-0 text-slate-600`}>{negocio.phone}</span>
                        </div>
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
                        <a href="/fidelizaV2.aab" download target="_blank" className="bg-blue-500 px-6 py-4 rounded-xl shadow-sm flex gap-4 items-center cursor-pointer">
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
                        <div className={`flex flex-col gap-3 my-4`}>
                            {negocio?.products?.filter(p => !p.onlyClaimable).map(p => <button
                                key={p.id}
                                disabled={true}
                                // onPress={() => navigation.navigate("Canjear")}
                                className={`bg-white flex flex-row items-center rounded-lg shadow-sm p-4 w-full gap-4`}
                            >
                                <div className={`w-20 h-20`}>
                                    <img
                                        src={p.image}
                                        resizeMode="contain"
                                        className={`w-full h-full`}
                                    />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className={`text-[#222B45] font-bold mb-0 block`}>
                                        {p.name}
                                    </span>
                                    <span className={`justify-start text-slate-600 text-sm mb-2 block line-clamp-2`}>{p.desc}</span>
                                    {/* <span className={`text-slate-600 mt-0`}></span> */}
                                    <span className={`font-bold`}>$ {p.value.toLocaleString()}</span>
                                </div>
                            </button>)}
                        </div>
                    </div>
                    {negocio?.products?.filter(p => (!p.onlyClaimable && p.price) || p.onlyClaimable).length > 0 && <span className={`font-bold text-lg text-[#222B45] mb-1 block`}>
                        Redime tus puntos
                    </span>}
                    <div className={`rounded-lg mb-6 w-full`}>
                        {/* <span className={`text-gray-500 mb-1`}>A continuación verás una lista de articulos o descuentos que puedes obtener con tus puntos acumulados</span> */}
                        <div className={`flex flex-col gap-3 my-4`}>
                            {negocio?.products?.filter(p => (!p.onlyClaimable && p.price) || p.onlyClaimable).map(p => <button
                                key={p.id}
                                disabled={negocio?.userNegocioPoints?.puntos >= p.price ? false : true}
                                // onPress={() => navigation.navigate("Canjear")}
                                className={`bg-white flex flex-row items-center rounded-lg shadow-sm p-4 w-full gap-4`}
                            >
                                <div className={`w-20 h-20`}>
                                    <img
                                        src={p.image}
                                        resizeMode="contain"
                                        className={`w-full h-full`}
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
                            </button>)}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default NegocioDetail