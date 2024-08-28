import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Chip,
  Spinner,
} from "@nextui-org/react";
import { EditDegreesForm } from "@/components/features";
import { TopicUser } from "@/types/user";
import { useState } from "react";
import toast from "react-hot-toast";
import userServices from "@/services/UserServices";
import { useAuth } from "@/hooks";

interface Props {
  user: TopicUser;
}

export const EditDegrees = ({ user }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const deleteDegree = (degreeId: string) => {
    setLoading(true);
    userServices
      .unenrollDegree(token, user.user.id, [degreeId])
      .then(() => {
        toast.success(
          "Programa educativo eliminado. Recarga la página para ver cambios"
        );
      })
      .catch((error) => {
        toast.error(error.toString());
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Button
        onPress={() => {
          toast((t) => (
            <span>
              ¿Estás seguro de editar los programas educativos de este usuario?
              <Button
                className="m-2"
                color="danger"
                size="sm"
                variant="flat"
                onPress={() => {
                  onOpen();
                  toast.dismiss(t.id);
                }}
              >
                Editar
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
        color="secondary"
        variant="ghost"
        radius="sm"
      >
        Editar Programas educativos
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-primary">
              Editar Programas educativos
            </ModalHeader>
            <ModalBody>
              <div className="w-full flex gap-2 flex-wrap">
                {user.userDegreePrograms.map((degree) => (
                  <Chip
                    key={degree.id}
                    color="secondary"
                    radius="sm"
                    startContent={loading && <Spinner size="sm" />}
                    variant="flat"
                    size="sm"
                    onClose={() => deleteDegree(degree.id)}
                  >
                    {degree.name.charAt(0).toUpperCase() +
                      degree.name.slice(1).replace(/-/g, " ")}
                  </Chip>
                ))}
              </div>
              <EditDegreesForm user={user} />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
