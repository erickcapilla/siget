import { SelectRole, SelectDegree } from "@/components/features";
import { Button, Input } from "@nextui-org/react";
import { passwordGenerator } from "@/utils/passwordGenerator";
import authService from "@/services/AuthServices";
import userService from "@/services/UserServices";
import { User, UsersResponse } from "@/types/user";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks";

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<UsersResponse[]>>;
}

export const AddUserForm = ({ setUsers }: Props) => {
  const { token } = useAuth();
  const [user, setUser] = useState<User>({
    email: "",
    password: passwordGenerator(),
    roles: [""],
  });
  const [degrees, setDegrees] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const password = passwordGenerator();
    setUser({ ...user, password });
    console.log({ ...user, password })

    try {
      const res = await authService.register(user);
      const data = await res.json();
      
      setUsers((prev) => [data, ...prev]);
      await userService.setDegrees(token, data.id, degrees);
      toast.success("Usuario agregado correctamente");
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col justify-between h-full"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 mb-5">
        <Input
          isRequired
          type="email"
          label="Correo electrónico"
          placeholder="Ingresa correo electrónico"
          variant="bordered"
          color="primary"
          radius="sm"
          value={user.email}
          onChange={(e) => {
            const email = e.target.value;
            setUser({ ...user, email });
          }}
        />
        <SelectRole
          onChange={(e) => {
            const role = e?.target.value;
            const roles = role ? role.split(",") : [];
            setUser({ ...user, roles });
          }}
        />
        <SelectDegree
          onChange={(e) => {
            const degree = e?.target.value;
            const degrees = degree ? degree.split(",") : [];
            setDegrees([...degrees]);
          }}
        />
      </div>
      <Button
        type="submit"
        variant="solid"
        color="primary"
        radius="sm"
        isLoading={isLoading}
      >
        {isLoading ? "Agregando" : "Agregar usuario"}
      </Button>
    </form>
  );
};
