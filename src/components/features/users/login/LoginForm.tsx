import { useState } from "react";

import { Input, Button } from "@nextui-org/react";

import { EyeOpen, EyeClose } from "@/components/icons";

import { useAuth } from "@hooks/useAuth";
import { Credentials } from "@/types";

export const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isLoading, setIsLoading] = useState(false);

  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await login(credentials);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="grid gap-y-7 w-full" onSubmit={handleSubmit}>
      <Input
        name="email"
        type="email"
        label="Correo electrónico"
        placeholder="Ingresa tu correo electrónico"
        autoComplete="email"
        color="primary"
        radius="sm"
        variant="bordered"
        autoFocus
        value={credentials.email}
        onChange={handleChange}
        isRequired
      />
      <Input
        name="password"
        type={isVisible ? "text" : "password"}
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        autoComplete="current-password"
        color="primary"
        radius="sm"
        variant="bordered"
        value={credentials.password}
        onChange={handleChange}
        isRequired
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
        radius="sm"
        isLoading={isLoading}
      >
        {isLoading ? "Iniciando" : "Iniciar sesión" }
      </Button>
    </form>
  );
};
