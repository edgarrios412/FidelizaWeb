import ModalLogin from "@/components/layout/ModalLogin"
import ImageBg from "../assets/name.png"
import moneda from "../assets/moneda.png"
import favicon from "/favicon.png"
import { useState } from "react"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Spinner from "@/components/Spinner"

const Login = () => {

    const navigate = useNavigate()
    const [negocios, setNegocios] = useState([])
    const [phone, setPhone] = useState("")
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)

    const buscarUsuario = () => {
        if (phone.length < 10) {
            setNegocios([])
            return toast({
                variant: "destructive",
                title: "Ingresa un número válido",
            })
        }
        setLoading(true)
        axios.get("/negocio/byUserPhone/" + phone).then(({ data }) => {setNegocios(data);setLoading(false)}, (e) => {
            setLoading(false)
            toast({
                variant: "destructive",
                title: e.response.data
            }); setNegocios([])
        })
    }

    return (
        <div className="bg-[#f2f5ff] w-[100vw] h-[100vh]">
            <div className="bg-white w-full h-16 flex items-center justify-center px-10">
                {/* <img className={"w-10"} src={favicon} /> */}
                <img className={"w-36"} src={ImageBg} />
                {/* <span></span> */}
            </div>
            <div className="bg-[#f2f5ff] w-full py-6 px-4">
                <a href="/fidelizaV2.aab" download target="_blank" className="bg-white px-6 py-3 rounded-xl shadow-sm flex gap-4 items-center cursor-pointer">
                <img className={"h-14"} src={favicon} />
                            <div>
                                <span className="font-bold block mb-1">Descarga nuestra aplicación</span>
                                <span className="text-sm text-slate-500 line-clamp-2">Ya está disponible en Google Play y puedes descargarla dando click acá</span>
                            </div>
                </a>
            </div>
            <a
            href="https://wa.me/573118268264"
            target="_blank"
            className={`cursor-pointer flex flex-row items-center justify-between px-10 mb-8`}
          >
            <div className="flex flex-col">
              <span className={`font-bold text-[#23374D] text-base`}>
                ¿Necesitas ayuda?
              </span>
              <span className={`font-normal text-[#6B779A] text-sm`}>
                Ponte en contacto con nosotros
              </span>
            </div>
            <ArrowRight size={20}/>
          </a>
            <div className="bg-[#f2f5ff] w-full pb-6 px-4">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <span className="text-slate-500 text-sm">Consulta tus puntos de forma rápida a través de la web, para reclamar tus puntos debes descargar nuestra aplicación</span>
                    <div className="flex flex-col gap-2 mt-6">
                        <label className="font-semibold">Ingresa tu número de télefono</label>
                        <div className="flex flex-row gap-3 items-center">
                            <span className="text-slate-500">+57</span>
                            <input placeholder="3118268264" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} className="border-[1px] rounded-md border-gray-200 h-8 px-3 focus:outline-blue-200 w-full" />
                        </div>
                        <button onClick={buscarUsuario} className="bg-blue-200 py-2 rounded-md mt-4 text-blue-600 font-bold text-base flex flex-col items-center h-10">{loading ? <Spinner/> : "Consultar puntos"}</button>
                    </div>
                </div>
            </div>
            <div className="bg-[#f2f5ff] w-full px-4">
                {negocios.length > 0 && negocios?.map(n => <div
                    key={n.id}
                    onClick={() => navigate("/negocio/"+n.id)}
                    className="cursor-pointer pr-4 flex flex-row items-center justify-between gap-4 bg-white px-4 py-3 rounded-lg shadow-sm"
                >
                    <div className="flex flex-row gap-4 items-center">
                        <img
                            src={n.image}
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <span className="font-semibold text-base text-[#222B45]">
                                {n.name}
                            </span>
                            <div className="flex flex-row items-center gap-1">
                                <img
                                    src={moneda}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm text-blue-500 font-bold">{n?.userNegocioPoints?.puntos ?? 0}</span>
                            </div>
                        </div>
                    </div>
                    <ArrowRight size={18} color="gray"/>
                    {/* <Icon name={"chevron-right"} size={24} /> */}
                </div>)}
            </div>
            {/* <ModalLogin className="absolute" open={true} /> */}
        </div>
    )
}

export default Login