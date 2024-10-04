import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { ChangePasswordForm } from "@/components/features";

interface Props {
  classButton?: string;
}

export const ModalChangePassword = ({ classButton }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className={`${classButton} w-full`}
        color="danger"
        radius="sm"
        variant="flat"
        onPress={() => {
          toast((t) => (
            <span>
              ¿Estás seguro de cambiar tu contraseña?
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
                Cambiar
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
        Cambiar contraseña
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-primary">
              Cambiar contraseña
            </ModalHeader>
            <ModalBody>
              <ChangePasswordForm />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
