import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import sendEmailForgotPassword from "@/services/AuthServices";
import { EyeOpen, EyeClose } from "@icons/index";

interface Props {
  id: string;
}

export const NewPasswordForm = ({ id }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [credentials, setCredentials] = useState({
    password: "",
    samePassword: "",
  });

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
        await sendEmailForgotPassword.resetPassword(id, credentials.password);
        console.log("Completed")
      } catch(error) {
        console.error(error)
      }
    } else {
      console.log("La contraseña tiene que ser la misma")
    }

  };

  return (
    <form action="" className="grid gap-5" onSubmit={handleSubmit}>
      <Input
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
        type={isVisible ? "text" : "password"}
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
      <Button
        type="submit"
        variant="solid"
        color="primary"
        className="w-full"
        radius="sm"
      >
        Cambiar contraseña
      </Button>
    </form>
  );
};
