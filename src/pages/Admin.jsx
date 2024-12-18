import ModalLogin from "@/components/layout/ModalLogin"
import ImageBg from "../assets/name.png"
import moneda from "../assets/moneda.png"
import favicon from "/favicon.png"
import { useEffect, useState } from "react"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Spinner from "@/components/Spinner"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Admin = () => {

    const navigate = useNavigate()
    const [negocios, setNegocios] = useState([])
    const [negociosAll, setNegociosAll] = useState([])
    const [phone, setPhone] = useState("")
    const [points, setPoints] = useState(0)
    const [negocioId, setNegocioId] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const { toast } = useToast()
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get("/negocio/0").then(({ data }) => { setNegocios(data); setNegociosAll(data) })
    }, [])

    useEffect(() => {
        axios.get("/negocio/getUserNegocio/" + negocioId).then(({ data }) => { setUsers(data) })
    }, [negocioId])

    const editarImagen = () => {
        axios.put("/negocio/edit", { negocioId, url }).then(({ data }) => {
            toast({
                variant: "default",
                title: "Edicion exitosa",
            }); setLoading(false)
        }, (e) => {
            setLoading(false)
            toast({
                variant: "destructive",
                title: e.response.data
            })
        })
    }

    const buscarUsuario = (phone) => {
        axios.get("/negocio/byUserPhone/" + phone).then(({ data }) => {
            toast({
                variant: "default",
                title: `Tiene ${data.find(n => n.id == negocioId).userNegocioPoints?.puntos} puntos`
            })
        }, (e) => {
            toast({
                variant: "destructive",
                title: e.response.data
            })
        })
    }

    const enviarPuntos = () => {
        axios.post("/negocio/sendPoints", {
            negocioId: negocioId,
            phone: phone,
            puntos: points
        }).then(({ data }) => {
            toast({
                variant: "default",
                title: "Envio exitoso",
            }); setLoading(false)
        }, (e) => {
            setLoading(false)
            toast({
                variant: "destructive",
                title: e.response.data
            })
        })
    }

    return (
        <div className="bg-[#f2f5ff] w-[100vw] h-[100vh]">
            <div className="bg-[#f2f5ff] w-full py-6 px-4">

            </div>
            <div className="bg-[#f2f5ff] w-full pb-6 px-4">
                <div className="bg-white p-6 rounded-xl shadow-sm mt-12">
                    <span className="text-slate-500 text-sm">Envia puntos</span>
                    <div className="flex flex-col gap-2 mt-6">
                        <label className="font-semibold">Ingresa tu número de télefono</label>
                        <div className="flex flex-row gap-3 items-center">
                            <span className="text-slate-500">+57</span>
                            <input type="number" placeholder="3022536253" value={phone} onChange={(e) => setPhone(e.target.value)} className="border-[1px] rounded-md border-gray-200 h-8 px-3 focus:outline-blue-200 w-full" />
                        </div>
                        <label className="font-semibold">ID Negocio</label>
                        <div className="flex flex-row gap-3 items-center">
                            {/* <span className="text-slate-500">+57</span> */}
                            <input type="number" placeholder="1" value={negocioId} onChange={(e) => setNegocioId(e.target.value)} className="border-[1px] rounded-md border-gray-200 h-8 px-3 focus:outline-blue-200 w-full" />
                        </div>
                        <label className="font-semibold">Puntos</label>
                        <div className="flex flex-row gap-3 items-center">
                            {/* <span className="text-slate-500">+57</span> */}
                            <input type="number" placeholder="10" value={points} onChange={(e) => setPoints(e.target.value)} className="border-[1px] rounded-md border-gray-200 h-8 px-3 focus:outline-blue-200 w-full" />
                        </div>
                        <button onClick={enviarPuntos} className="bg-blue-200 py-2 rounded-md mt-4 text-blue-600 font-bold text-base flex flex-col items-center h-10">{loading ? <Spinner /> : "Enviar puntos"}</button>
                    </div>
                </div>
            </div>
            <div className="bg-[#f2f5ff] w-full pb-6 px-4">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <span className="text-slate-500 text-sm">Editar negocio</span>
                    <div className="flex flex-col gap-2 mt-6">
                        <label className="font-semibold">ID Negocio</label>
                        <div className="flex flex-row gap-3 items-center">
                            {/* <span className="text-slate-500">+57</span> */}
                            <input type="number" placeholder="1" value={negocioId} onChange={(e) => setNegocioId(e.target.value)} className="border-[1px] rounded-md border-gray-200 h-8 px-3 focus:outline-blue-200 w-full" />
                        </div>
                        <label className="font-semibold">Imagen URL</label>
                        <div className="flex flex-row gap-3 items-center">
                            {/* <span className="text-slate-500">+57</span> */}
                            <input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} className="border-[1px] rounded-md border-gray-200 h-8 px-3 focus:outline-blue-200 w-full" />
                        </div>
                        <button onClick={editarImagen} className="bg-blue-200 py-2 rounded-md mt-4 text-blue-600 font-bold text-base flex flex-col items-center h-10">{loading ? <Spinner /> : "Guardar"}</button>
                    </div>
                </div>
            </div>
            <div className="bg-[#f2f5ff] w-full px-4 pb-10">
                {negocios?.length > 0 && <span className={`font-bold text-lg text-[#222B45] mb-2 block`}>
                    Negocios Aliados
                </span>}
                {negocios?.length > 0 && negocios?.map(n => <div
                    key={n.id}
                    onClick={() => setNegocioId(n.id)}
                    className="mb-2 cursor-pointer pr-4 flex flex-row items-center justify-between gap-4 bg-white px-4 py-3 rounded-lg shadow-sm"
                >
                    <div className="flex flex-row gap-4 items-center">
                        <div className="relative w-10 h-10 rounded-full">
                            {isLoading && <Skeleton circle className="absolute top-0 left-0 w-full h-full" />}
                            <img
                                src={n.image}
                                onLoad={() => { setIsLoading(false) }}
                                className={`w-full h-full object-cover rounded-full transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"
                                    }`}
                            />
                        </div>
                        <div>
                            <span className="font-semibold text-base text-[#222B45]">
                                {n.name}
                            </span>
                        </div>
                    </div>
                    {/* <ArrowRight size={18} color="gray" /> */}
                </div>)}
            </div>
            <div className="bg-[#f2f5ff] w-full px-4 pb-10">
                {users?.length > 0 && <span className={`font-bold text-lg text-[#222B45] mb-2 block`}>
                    Usuarios del negocio
                </span>}
                {users?.length > 0 && users?.map(n => <div
                    key={n.id}
                    onClick={() => {setPhone(n.phone); buscarUsuario(n.phone)}}
                    className="mb-2 cursor-pointer pr-4 flex flex-row items-center justify-between gap-4 bg-white px-4 py-3 rounded-lg shadow-sm"
                >
                    <div className="flex flex-row gap-4 items-center w-full">
                        <div className="relative w-10 h-10 rounded-full">
                            <img
                                src={"https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"}
                                onLoad={() => { setIsLoading(false) }}
                                className={`w-full h-full object-cover rounded-full transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"
                                    }`}
                            />
                        </div>
                        <div className="flex flex-row justify-between w-full items-center">
                            <span className="font-semibold text-base text-[#222B45]">
                                {n.name ?? "Desconocido"} (Telefono: {n.phone})
                            </span>
                            <a href={`https://api.whatsapp.com/send/?phone=${n.countryCode}${n.phone}&text=Hola ${n.name}`}>
                                <button className="bg-blue-200 px-4 py-1 rounded-md text-blue-600 font-bold flex flex-col items-center">
                                    Enviar
                                </button>
                            </a>
                        </div>
                    </div>
                    {/* <ArrowRight size={18} color="gray" /> */}
                </div>)}
            </div>
            {/* <ModalAdmin className="absolute" open={true} /> */}
        </div>
    )
}

export default Admin