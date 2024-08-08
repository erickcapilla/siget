import { Select, SelectItem, Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import graduationServices from "@/services/GraduationsOptionsServices";

export const GraduationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  const graduations = [
    { key: "prototype", label: "Prototipo" },
    { key: "thesis", label: "Tesis" },
    { key: "memoirs", label: "Memorias" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    graduationServices
      .saveOption(name)
      .then(() => {
        setName("");
        toast.success(
          "Opción de titulación agregado correctamente. Si no ve cambios recargue la página"
        );
      })
      .catch((error) => toast.error(error.toString()))
      .finally(() => setIsLoading(false));
  };

  return (
    <form className="grid gap-2" onSubmit={handleSubmit}>
      <Select
        label="Selecciona una opción de titulación"
        color="primary"
        variant="bordered"
        onChange={(e) => setName(e.target.value)}
      >
        {graduations.map((graduation) => (
          <SelectItem key={graduation.key} value={graduation.key}>
            {graduation.label}
          </SelectItem>
        ))}
      </Select>
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
