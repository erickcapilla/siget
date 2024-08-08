import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import sendEmailForgotPassword from "@/services/AuthServices";
import { EyeOpen, EyeClose } from "@/components/icons/index";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { paths } from "@/utils";

interface Props {
  id: string;
}

export const NewPasswordForm = ({ id }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);
  const [credentials, setCredentials] = useState({
    password: "",
    samePassword: "",
  });
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const { password, samePassword } = credentials;

    if(password === samePassword) {
      try {
        setIsLoading(true)
        await sendEmailForgotPassword.resetPassword(id, credentials.password);
        toast.success("Constraseña actualizada")
        navigate(paths.login)
      } catch(error) {
        toast.error(error.toString())
        console.error(error)
      }
    } else {
      toast.error("Las contraseñas tienes que coincidir")
    }

  };

  return (
    <form action="" className="grid gap-5" onSubmit={handleSubmit}>
      <Input
        autoFocus
        name="password"
        type={isVisible ? "text" : "password"}
        label="Nueva contraseña"
        placeholder="Ingresa nueva contraseña"
        variant="bordered"
        color="primary"
        radius="sm"
        isRequired
        onChange={handleChange}
        endContent={
          <button
            className="focus:outline-none mb-1"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeClose className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeOpen className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />
      <Input
        name="samePassword"
        type={isVisible2 ? "text" : "password"}
        label="Repite la contraseña"
        placeholder="Ingresa la misma contraseña"
        variant="bordered"
        color="primary"
        radius="sm"
        isRequired
        onChange={handleChange}
        endContent={
          <button
            className="focus:outline-none mb-1"
            type="button"
            onClick={toggleVisibility2}
          >
            {isVisible2 ? (
              <EyeClose className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeOpen className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />
      <Button
        type="submit"
        variant="solid"
        color="primary"
        className="w-full"
        radius="sm"
        isLoading={isLoading}
      >
        {isLoading ? "Cambiando contraseña" : "Cambiar contraseña"}
      </Button>
    </form>
  );
};
