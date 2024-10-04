import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { EditAcceptedTopic } from "@/components/features";
import { TopicResponse } from "@/types/topic";
import { useAuth } from "@/hooks";
import { SettingsOutline } from "@/components/icons";
import topicService from "@/services/TopicServices";
import toast from "react-hot-toast";

export const ModalOptionsTopic = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { acceptedTopics, token, setAcceptedTopics } = useAuth();

  const leaveTopic = () => {
    topicService
      .leaveTopic(token, acceptedTopics[0].id)
      .then(() => setAcceptedTopics([]))
      .then(() => {
        toast.success("Tema abandonado con éxito");
      })
      .catch((error) => toast.error(error.toString()));
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="warning"
        variant="flat"
        radius="sm"
        isIconOnly
        className="bg-transparent"
      >
        <SettingsOutline />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-primary">
              Opciones del Tema
            </ModalHeader>
            <ModalBody>
              <EditAcceptedTopic
                classButton="w-full"
                topicData={
                  {
                    id: acceptedTopics[0].id,
                    title: acceptedTopics[0].title,
                    description: acceptedTopics[0].description,
                    graduationOption: acceptedTopics[0].graduationOption,
                  } as TopicResponse
                }
              />
              <Button
                className="w-full"
                radius="sm"
                color="danger"
                variant="flat"
                onPress={() => {
                  toast((t) => (
                    <span>
                      ¿Estás seguro de ABANDONAR el tema?
                      <Button
                        className="m-2"
                        color="danger"
                        size="sm"
                        variant="flat"
                        onPress={() => {
                          leaveTopic();
                          toast.dismiss(t.id);
                        }}
                      >
                        Abandonar
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
                Abandonar tema
              </Button>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
