import { SelectRole, SelectDegree } from "../../../ui";
import { Button, Input } from "@nextui-org/react";
import { passwordGenerator } from "@/utils/passwordGenerator";
import authService from "@/services/AuthServices";
import userService from "@/services/UserServices";
import { User } from "@/types";
import { useState } from 'react'

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const AddUserForm = ({ setUsers }: Props) => {
  const [user, setUser] = useState<User>({
    email: "",
    password: passwordGenerator(),
    roles: [""],
  });
  const [degrees, setDegrees] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = passwordGenerator();
    setUser({ ...user, password });

    try {
      const res = await authService.register(user)
      const data = await res.json()
      setUsers((prev) => [data, ...prev]);
      await userService.setDegrees(data.id, degrees)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col justify-between h-full"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5">
        <Input
          isRequired
          type="text"
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
            setDegrees([ ...degrees ]);
          }}
        />
      </div>
      <Button type="submit" variant="solid" color="primary" radius="sm">
        Agregar usuario
      </Button>
    </form>
  );
};
