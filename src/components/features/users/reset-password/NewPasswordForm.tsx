import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import sendEmailForgotPassword from "@/services/AuthServices";

interface Props {
  id: string;
}

export const NewPasswordForm = ({ id }: Props) => {
  const [credentials, setCredentials] = useState({
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      await sendEmailForgotPassword.resetPassword(id, credentials.password);
      console.log("Completed")
    } catch(error) {
      console.error(error)
    }

  };

  return (
    <form action="" className="grid gap-5" onSubmit={handleSubmit}>
      <Input
        name="password"
        type="password"
        label="Contraseña"
        placeholder="Ingresa nueva contraseña"
        variant="bordered"
        color="primary"
        radius="sm"
        onChange={handleChange}
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
