import { Chip, Button, Spinner } from "@nextui-org/react";
import { GraduationResponse } from "@/types/admin";
import graduationsServices from "@/services/GraduationsOptionsServices";
import { useState } from "react";
import toast from "react-hot-toast";
import { optionNames } from "@/utils/utils";
import { useAuth } from "@/hooks";

interface Props {
  setGraduations: React.Dispatch<React.SetStateAction<GraduationResponse[]>>;
  graduation: GraduationResponse;
}

export const GraduationItem = ({ setGraduations, graduation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const deleteGraduation = () => {
    setIsLoading(true);
    graduationsServices
      .deleteOption(token, graduation.id)
      .then(() => {
        setGraduations((prev) => prev.filter((item) => item.id !== graduation.id));
        toast.success("Opción de titulación eliminado correctamente");
      })
      .catch((error) => toast.error(error.toString()))
      .finally(() => setIsLoading(false));
  };
  return (
    <Chip
      className="cursor-pointer"
      color={isLoading ? "danger" : "success"}
      variant="flat"
      startContent={isLoading && <Spinner size="sm" />}
      onClose={() => {
        toast((t) => (
          <span>
            ¿Estás seguro de eliminar la opción de titulación de <b>{optionNames[graduation.name]}</b>?
            <Button
              className="m-2"
              color="danger"
              size="sm"
              variant="flat"
              onPress={() => {
                deleteGraduation();
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
      {isLoading ? "Eliminando" : optionNames[graduation.name]}
    </Chip>
  );
};
