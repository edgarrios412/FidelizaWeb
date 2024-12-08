import {
  BellRing,
  Check,
  Send,
  FileQuestion,
  CalendarDays,
  TextSelect,
  X,
  Save,
  Users,
  FolderOpen,
  ChevronLeft,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useEffect, useState } from "react";
import {
  useInView,
  motion,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserContext } from "@/utils/context/User/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatDate } from "@/utils/helpers/formatter";
import QRCode from "react-qr-code";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const Bandeja = ({ className, ...props }) => {
  const { usuario, updateUsuario } = useContext(UserContext);
  const { toast } = useToast();
  const [procedimientoId, setProcedimientoId] = useState(null);
  const [pacienteOptionId, setPacienteOptionId] = useState(null);

  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    axios.get("/laboratory/appointments/1").then(({data}) => setAppointments(data), (e) => console.log(e))
  },[])

  const enviarResultados = (data) => {
    console.log(data.user.id)
    axios.post("/laboratory/sendExam", {userId:data.user.id, laboratoryId:1}).then(() => alert("Resultados enviados"), (e) => console.log(e))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-100 font-[OpenSans] px-20 py-10"
    >
      <div className="flex gap-10">
        {!procedimientoId ? (
          <Card className={cn("w-full h-fit", className)} {...props}>
            <CardHeader>
              <CardTitle>Bandeja</CardTitle>
              <CardDescription>
                Tienes {appointments.length} citas pendientes
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 max-h-fit">
              <div className="h-fit">
                {false ? (
                  <div className="h-36 text-center">
                    <TextSelect className="m-auto text-gray-300 h-14 w-14 my-4" />
                    <h1 className="text-muted-foreground text-sm">
                      No tienes nada pendiente
                    </h1>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Fecha</TableHead>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Documento</TableHead>
                        <TableHead>Correo</TableHead>
                        <TableHead>Ver</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.sort((a, b) => new Date(a.date) - new Date(b.date)).map(a => <TableRow key={a.id}>
                        <TableCell className="font-bold">{formatDate(a.date)}</TableCell>
                        <TableCell>{a.user.fullName.toUpperCase()}</TableCell>
                        <TableCell>{a.user.document}</TableCell>
                        <TableCell>{a.user.email}</TableCell>
                        <TableCell>
                          <Button 
                            onClick={() => enviarResultados(a)}
                          // onClick={() => setProcedimientoId(a.id)}
                          >
                            Enviar resultados
                          </Button>
                        </TableCell>
                      </TableRow>)}
                    </TableBody>
                  </Table>
                )}
              </div>
            </CardContent>
            {/* <CardFooter>
              <Button
                className="w-full mt-5"
                onClick={() => alert("Enviando a patologia")}
              >
                <Check className="mr-2 h-4 w-4" /> Enviar a patología
              </Button>
            </CardFooter> */}
          </Card>
        ) : (
          <Card className={cn("w-full h-fit", className)} {...props}>
            <CardHeader>
              <CardTitle>
                <Button onClick={() => setProcedimientoId(null)}>Atrás</Button>
              </CardTitle>
              {/* <CardDescription>
                Tienes 0 procedimientos pendientes
              </CardDescription> */}
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-3 gap-10">
                <div>
                  <Label className="font-bold">Paciente</Label>
                  <br></br>
                  <Dialog>
                    <DialogTrigger className="text-left">
                      <p className="font-bold underline">
                        {procedimientoId == 1 ? "EDGAR DAVID VILCHEZ RIOS" : "PEDRO JOSÉ RINCÓN MORALES"}
                      </p>
                    </DialogTrigger>
                    <DialogContent className="font-[OpenSans]">
                      {!pacienteOptionId && (
                        <div>
                          <DialogTitle>Información</DialogTitle>
                          <DialogDescription
                            className={"font-[OpenSans] text-sm mt-2 mb-4"}
                          >
                            Accede a más información del paciente
                          </DialogDescription>
                          <div className="flex flex-col gap-4">
                            <div
                              onClick={() => setPacienteOptionId(1)}
                              className="hover:border-pink-200 hover:bg-pink-100 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4"
                            >
                              <Users />
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-bold leading-none">
                                  Datos del paciente
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Observa la información más detallada del
                                  paciente
                                </p>
                              </div>
                              {/* <Button>Ver preguntas comunes</Button> */}
                            </div>
                            <div
                              onClick={() => setPacienteOptionId(2)}
                              className="hover:border-pink-200 hover:bg-pink-100 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4"
                            >
                              <FolderOpen />
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-bold leading-none">
                                  Historia clínica
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Acá puedes ver todos los procedimientos que se
                                  ha realizado el paciente
                                </p>
                              </div>
                            </div>
                            {/* <Button>Ver preguntas comunes</Button> */}
                          </div>
                        </div>
                      )}
                      {pacienteOptionId == 1 && (
                        <div>
                          <DialogTitle className="flex gap-4 items-center">
                            <ChevronLeft
                              className="mt-1 cursor-pointer"
                              onClick={() => setPacienteOptionId(null)}
                            />{" "}
                            Datos del paciente
                          </DialogTitle>
                          <DialogDescription
                            className={"font-[OpenSans] text-sm mt-2 mb-4"}
                          >
                            Observa la información más detallada del paciente
                          </DialogDescription>
                          <h3 className="my-20 text-center font-bold">
                            EN DESARROLLO
                          </h3>
                        </div>
                      )}
                      {pacienteOptionId == 2 && (
                        <div>
                          <DialogTitle className="flex gap-4 items-center">
                            <ChevronLeft
                              className="mt-1 cursor-pointer"
                              onClick={() => setPacienteOptionId(null)}
                            />{" "}
                            Historia clínica
                          </DialogTitle>
                          <DialogDescription
                            className={"font-[OpenSans] text-sm mt-2 mb-4"}
                          >
                            Acá puedes ver todos los procedimientos que se ha
                            realizado el paciente
                          </DialogDescription>
                          <h3 className="my-20 text-center font-bold">
                            EN DESARROLLO
                          </h3>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
                <div>
                  <Label className="font-bold">Documento</Label>
                  <p>29605063</p>
                </div>
                <div>
                  <Label className="font-bold">Lámina</Label>
                  <p>ESEHSP-24-12529</p>
                </div>
                <div>
                  <Label className="font-bold">Resultado de la lectura</Label>
                  <Select>
                    <SelectTrigger className="w-[180px] mt-1">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent className="font-[OpenSans]">
                      <SelectItem value="true">Anormalidad</SelectItem>
                      <SelectItem value="false">Negativo</SelectItem>
                      <SelectItem value="undefined">No definido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-bold">Patólogo</Label>
                  <p>CARLOS JOSÉ MENDOZA MARTINEZ</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-10 mt-4">
                <div>
                  <Label className="font-bold mb-4">
                    Calidad de la muestra
                  </Label>
                  <Select>
                    <SelectTrigger className="w-[180px] mt-4">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent className="font-[OpenSans]">
                      <SelectItem value="true">Satisfactoria</SelectItem>
                      <SelectItem value="false">No satisfactoria</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="mt-4 flex flex-col gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Célular escasas
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Citólisis
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Coloración deficiente
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Falta información clínica
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Mala fijación
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Muestra muy gruesa
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        No endocervicales
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Solo exudado inflamatorio
                      </Label>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="font-bold">
                    Otros hallazgos neoplasicos
                  </Label>
                  <div className="mt-4 flex flex-col gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Inflamatorio
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Cambios celulares reactivos asociados a radiación
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Cambios celulares asociados a DIU
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Hemorrágico
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Atrofia
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Células endrometriales después de 40 años
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Cambios celulares reactivos asociados a inflamación
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Cambios celulares reactivos asociados a cervicitis
                        folicular
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Cambios celulares reactivos con la presencia de células
                        glandulares post-histerectomía
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Cambios celulares no neoplásicos asociados a metaplasia
                        escamosa
                      </Label>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="font-bold">Microorganismos</Label>
                  <div className="mt-4 flex flex-col gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Herpes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Vaginosis bacteriana
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Tricomonas
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Hongos
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Mala fijación
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Actinomyces
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Citomegalovirus
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-10 mt-4">
                <div>
                  <Label className="font-bold mb-4">Células escamosas</Label>
                  <div className="mt-4 flex flex-col gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Atipias en células escamosas significado indeterminado
                        (ASCUS)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Atipias en células escamosas significado indeterminado
                        sugestivo de lei de alto grado (ASC-H)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Lesión intraepitelial escamosa bajo grado LEIBG
                        (displasia leve NIC I)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Lesión intraepitelial escamosa de alto grado (H-SIL -
                        NIC II - NIC III - CA IN)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Carcinoma escamocelular invasivo
                      </Label>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="font-bold">Célular glandulares</Label>
                  <div className="mt-4 flex flex-col gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Célular endocervicales atípicas sin ningún otro
                        significado
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Célular endometriales atípicas sin ningún otro
                        significado
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Célular endocervicales atípicas sospechosas de
                        malignidad
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Célular endometriales atípicas sospechosas de malignidad
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Adenocarcinoma endocervical in situ
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Adenocarcinoma endocervical
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Adenocarcinoma endometrial
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="leading-5">
                        Otras neoplasias
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message" className="font-bold mb-2 mt-4">
                  Observaciones
                </Label>
                <Textarea
                  placeholder="Ingresa tu observación acá"
                  id="message"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => alert("Guardar resultados")}
              >
                <Check className="mr-2 h-4 w-4" /> Guardar resultados
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </motion.div>
  );
};

export default Bandeja;
