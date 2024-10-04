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
  topicData: TopicResponse;
  classButton?: string;
  setUserTopics?: React.Dispatch<React.SetStateAction<TopicResponse[]>>;
}

export const EditTopic = ({ classButton, topicData, setUserTopics }: Props) => {
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
              <EditTopicForm
                topicData={topicData}
                setUserTopics={setUserTopics}
              />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
