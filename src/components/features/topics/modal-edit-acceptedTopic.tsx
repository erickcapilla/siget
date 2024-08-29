import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { EditAcceptedTopicForm } from "@/components/features";
import { TopicResponse } from "@/types/topic";

interface Props {
  topicData: TopicResponse;
  classButton?: string;
}

export const EditAcceptedTopic = ({ classButton, topicData }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className={classButton} onPress={onOpen} color="warning" variant="flat" radius="sm">
        Editar
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-primary">
              Editar Tema
            </ModalHeader>
            <ModalBody>
              <EditAcceptedTopicForm
                topicData={topicData}
              />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
