import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import degreeServices from "@/services/DegreeServices";

export const DegreeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    degreeServices
      .saveDegree(name)
      .then(() => {
        setName("");
        toast.success(
          "Programa educativo agregado correctamente. Si no ve cambios recargue la página"
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
