import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import degreeServices from "@/services/DegreeServices";
import { DegreeResponse } from "@/types/admin";
import { useAuth } from "@/hooks";

interface Props {
  setDegrees: React.Dispatch<React.SetStateAction<DegreeResponse[]>>;
}

export const DegreeForm = ({setDegrees}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const { token } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    degreeServices
      .saveDegree(token, name)
      .then((res) => res.json())
      .then((data) => setDegrees((prev) => [...prev, data]))
      .then(() => {
        setName("");
        toast.success(
          "Programa educativo agregado correctamente."
        );
      })
      .catch((error) => toast.error(error.toString()))
      .finally(() => setIsLoading(false));
  };

  return (
    <form className="grid gap-2" onSubmit={handleSubmit}>
      <Input
        isRequired
        label="Agregar programa educativo"
        placeholder="Ingresa el nombre del programa educativo"
        variant="bordered"
        color="primary"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        className="w-full"
        color="primary"
        radius="sm"
        isLoading={isLoading}
        type="submit"
      >
        {isLoading ? "Agregando" : "Agregar"}
      </Button>
    </form>
  );
};
