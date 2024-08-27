import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import sendEmailForgotPassword from "@/services/AuthServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { paths } from "@/utils";
import { useAuth } from "@/hooks";

export const SendEmailForm = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await sendEmailForgotPassword.sendEmailForgotPassword(token, credentials.email);
      toast.success("Código envíado. Revisa tu correo electrónico");
      navigate(paths.login)
    } catch (error) {
      toast.error(error.toString());
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form action="" className="grid gap-5" onSubmit={handleSubmit}>
        <Input
          autoFocus
          name="email"
          type="email"
          label="Correo electrónico"
          placeholder="Ingresa tu correo electrónico"
          variant="bordered"
          color="primary"
          radius="sm"
          isRequired
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="solid"
          color="primary"
          className="w-full"
          radius="sm"
          isLoading={isLoading}
        >
          {isLoading ? "Envíando código" : "Envíar código"}
        </Button>
      </form>
    </>
  );
};
