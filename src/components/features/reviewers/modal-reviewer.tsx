import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { AddReviewerForm, ReviewerItem } from "@/components/features";
import { ReviewerResponse } from "@/types/reviewer";

interface Props {
  topicId: string;
  classButton?: string;
  setReviewers: React.Dispatch<React.SetStateAction<ReviewerResponse[]>>;
  reviewers: ReviewerResponse[];
}

export const ModalReviwer = ({
  classButton,
  topicId,
  setReviewers,
  reviewers,
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className={classButton}
        onPress={onOpen}
        color="warning"
        variant="flat"
        radius="sm"
      >
        Revisores
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-primary">
              Editar Revisores
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-2 flex-wrap">
                {reviewers.map((reviewer) => (
                  <ReviewerItem
                    key={reviewer.id}
                    reviewer={reviewer}
                    setReviewers={setReviewers}
                  />
                ))}
              </div>
              <AddReviewerForm topicId={topicId} setReviewers={setReviewers} />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
