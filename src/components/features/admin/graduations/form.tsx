import { Select, SelectItem, Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import graduationServices from "@/services/GraduationsOptionsServices";
import { useAuth } from "@/hooks";
import { GraduationResponse } from "@/types/admin";

interface Props {
  setGraduations: React.Dispatch<React.SetStateAction<GraduationResponse[]>>;
}

export const GraduationForm = ({ setGraduations }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const { token } = useAuth();

  const graduations = [
    { key: "prototype", label: "Prototipo" },
    { key: "thesis", label: "Tesis" },
    { key: "memoirs", label: "Memorias" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    graduationServices
      .saveOption(token, name)
      .then((res) => res.json())
      .then((data) => setGraduations((prev) => [...prev, data]))
      .then(() => {
        setName("");
        toast.success(
          "Opción de titulación agregado correctamente."
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
