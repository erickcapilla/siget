import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import sendEmailForgotPassword from "@/services/AuthServices";

export const SendEmailForm = () => {

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
    await sendEmailForgotPassword.sendEmailForgotPassword(credentials.email);
  };

  return (
    <>
      <form action="" className="grid gap-5" onSubmit={handleSubmit}>
        <Input
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
        >
          Envíar código
        </Button>
      </form>
    </>
  );
};
