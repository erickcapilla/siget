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

export const ModalOptionsTopic = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { acceptedTopics } = useAuth();

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
