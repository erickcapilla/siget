import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import authServices from "@/services/AuthServices";
import { useAuth } from "@/hooks/useAuth";
import { EyeOpen, EyeClose } from "@/components/icons";

export const ChangePasswordForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = (e: React.FormEvent<EventTarget | HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    authServices
      .changePassword(token, oldPassword, newPassword)
      .then(() => {
        setOldPassword("");
        setNewPassword("");
        toast.success("Contraseña actualizada")
      })
      .catch((error) => toast.error(error.toString()))
      .finally(() => setIsLoading(false));
  };

  return (
    <form className="flex flex-col gap-3 h-full" onSubmit={handleSubmit}>
      <Input
        name="password"
        type={isVisible ? "text" : "password"}
        label="Contraseña actual"
        placeholder="Ingresa tu contraseña actual"
        autoComplete="current-password"
        color="primary"
        radius="sm"
        variant="bordered"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
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
      <Input
        name="password"
        type={isVisible2 ? "text" : "password"}
        label="Nueva contraseña"
        placeholder="Ingresa tu nueva contraseña"
        autoComplete="current-password"
        color="primary"
        radius="sm"
        variant="bordered"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        isRequired
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
        className="w-full"
        isLoading={isLoading}
        color="primary"
        variant="solid"
        type="submit"
        radius="sm"
      >
        Actualizar
      </Button>
    </form>
  );
};
