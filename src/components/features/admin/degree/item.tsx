import { Chip, Button, Spinner } from "@nextui-org/react";
import { DegreeResponse } from "@/types/admin";
import degreeServices from "@/services/DegreeServices";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  setDegrees: React.Dispatch<React.SetStateAction<DegreeResponse[]>>;
  setDegree: React.Dispatch<React.SetStateAction<DegreeResponse>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  degree: DegreeResponse;
}

export const DegreeItem = ({ setDegrees, setDegree, setIsEditing, degree }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const name =
    degree.name.charAt(0).toUpperCase() +
    degree.name.slice(1).replace(/-/g, " ");

  const deleteDegree = () => {
    setIsLoading(true);
    degreeServices
      .deleteDegree(degree.id)
      .then(() => {
        setDegrees((prev) => prev.filter((item) => item.id !== degree.id));
        toast.success("Programa educativo eliminado correctamente");
      })
      .catch((error) => toast.error(error.toString()))
      .finally(() => setIsLoading(false));
  };
  return (
    <Chip
      className="cursor-pointer"
      color={isLoading ? "danger" : "secondary"}
      variant="flat"
      startContent={isLoading && <Spinner size="sm" />}
      onClick={() => {
        setDegree(degree)
        setIsEditing(true);
      }}
      onClose={() => {
        toast((t) => (
          <span>
            ¿Estás seguro de eliminar el programa educativo de <b>{name}</b>?
            <Button
              className="m-2"
              color="danger"
              size="sm"
              variant="flat"
              onPress={() => {
                deleteDegree();
                toast.dismiss(t.id);
              }}
            >
              Eliminar
            </Button>
            <Button
              className="m-2"
              size="sm"
              variant="flat"
              onPress={() => {
                toast.dismiss(t.id);
              }}
            >
              Cancelar
            </Button>
          </span>
        ));
      }}
    >
      {isLoading ? "Eliminando" : name}
    </Chip>
  );
};
