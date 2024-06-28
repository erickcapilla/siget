import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Link,
} from "@nextui-org/react";

import { EyeOpen, EyeClose } from "@icons/index";
import logoFacultad from "@images/logoFacultad.png";

import { useAuth } from "@hooks/useAuth";
import { Credentials } from "@/types";

export const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: ""
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    await login(credentials);
    navigate("/home");
  };

  return (
    <>
      <Card className="max-w-96 w-full" radius="sm" shadow="sm">
        <CardHeader className="flex justify-center">
          <img
            src={logoFacultad}
            alt="Logo de la facultad de ciencias básicas ingeniería y tecnología"
          />
        </CardHeader>
        <CardBody>
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
            <Button type="submit" variant="solid" color="primary" radius="sm">
              Iniciar sesión
            </Button>
          </form>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Link href="/reset" color="secondary" underline="always">
            ¿Olvidaste tu contraseña?
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
