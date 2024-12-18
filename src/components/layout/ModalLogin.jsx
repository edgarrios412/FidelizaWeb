import React, { useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { motion } from "framer-motion";
import { UserContext } from "@/utils/context/User/UserContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

export default ({ open, setOpen, setIsLogged, className }) => {

  return (
    <Dialog id={1} open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ingresar</DialogTitle>
          <DialogDescription className={"font-[OpenSans] text-sm"}>
            Ingresa a tu cuenta para tener acceso a todas las funcionalidades
            disponibles en la web
          </DialogDescription>
        </DialogHeader>
        <LoginForm setIsLogged={setIsLogged} />
      </DialogContent>
    </Dialog>
  );
};


function LoginForm({ className, setIsLogged }) {
  const {setUsuario} = useContext(UserContext)
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const {toast} = useToast()
  const navigate = useNavigate()

  const authUser = (e) => {
    e.preventDefault();
    setIsLoader(true);
    return navigate("/panel")
    axios
      .post("/usuario/auth", {
        usuario: username,
        password,
      })
      .then(
        ({ data }) => {
          console.log(data);
          if (data) {
            localStorage.setItem("userId", data.id);
            setUsuario(data)
            navigate("/panel")
          }
          setIsLoader(false);
        },
        (e) => {
          toast({
            variant:"destructive",
            title:e.response.data
          })
          // alert(e.response.data);
          setIsLoader(false);
        }
      );
  };

  return (
    <form
      onSubmit={authUser}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          className={"font-[OpenSans] text-sm"}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="usuario"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Contraseña</Label>
        <Input
          className={"font-[OpenSans] text-sm"}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
        />
      </div>
      {!isLoader ? (
        <Button type="submit">Ingresar</Button>
      ) : (
        <Button type="button">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={1}
          >
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Validando credenciales
          </motion.span>
        </Button>
      )}
    </form>
  );
}
