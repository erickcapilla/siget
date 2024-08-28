import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { EditTopicForm } from "@/components/features";
import { TopicResponse } from "@/types/topic";

interface Props {
  setUserTopics?: React.Dispatch<React.SetStateAction<TopicResponse[]>>;
  topicData: TopicResponse;
}

export const EditTopic = ({ setUserTopics, topicData }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="warning" variant="flat" radius="sm">
        Editar
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-primary">
              Modal Tema
            </ModalHeader>
            <ModalBody>
              <EditTopicForm
                setUserTopics={setUserTopics}
                topicData={topicData}
              />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
