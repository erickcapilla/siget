import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import degreeServices from "@/services/DegreeServices";
import { DegreeResponse } from "@/types/admin";

interface Props {
  setDegrees: React.Dispatch<React.SetStateAction<DegreeResponse[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  degree: DegreeResponse;
}

export const EditDegreeForm = ({ degree, setDegrees, setIsEditing }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newName, setName] = useState(
    degree.name.charAt(0).toUpperCase() +
      degree.name.slice(1).replace(/-/g, " ")
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    degreeServices
      .updateDegree(degree.id, newName)
      .then(() => {
        setName("");
        toast.success("Programa educativo editado correctamente.");
        setDegrees((prev) =>
          prev.map((item) =>
            item.id === degree.id ? { ...item, name: newName } : item
          )
        );
        setIsEditing(false);
      })
      .catch((error) => toast.error(error.toString()))
      .finally(() => setIsLoading(false));
  };

  return (
    <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
      <Input
        autoFocus
        isRequired
        label="Presiona un programa educativo"
        placeholder="Ingresa el nuevo nombre del programa educativo"
        variant="bordered"
        color="primary"
        value={newName}
        onChange={(e) => setName(e.target.value)}
      />
      <Button color="primary" radius="sm" isLoading={isLoading} type="submit">
        {isLoading ? "Editando" : "Guardar"}
      </Button>
      <Button radius="sm" onPress={() => setIsEditing(false)}>
        Cancelar
      </Button>
    </form>
  );
};
