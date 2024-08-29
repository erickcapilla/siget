import type { ReviewerResponse } from "@/types/reviewer";
import { Chip, Avatar, Spinner } from "@nextui-org/react";
import reviewService from "@/services/ReviewerServices";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks";
import { useState } from "react";
import { ROLES } from "@/utils";

interface Props {
  reviewer: ReviewerResponse;
  setReviewers?: React.Dispatch<React.SetStateAction<ReviewerResponse[]>>;
}

export const ReviewerItem = ({ reviewer, setReviewers }: Props) => {
  const { token, role } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const deleteReviewer = () => {
    setIsLoading(true);
    reviewService
      .deleteReviewer(token, reviewer.id)
      .then(
        () =>
          setReviewers &&
          setReviewers((prev) => prev.filter((r) => r.id !== reviewer.id))
      )
      .then(() => toast.success("Revisor eliminado"))
      .catch((error) => toast.error(error.toString()))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {role === ROLES.SUBJECT_HOLDER ? (
        <Chip
          avatar={<Avatar color="success" />}
          startContent={isLoading && <Spinner size="sm" />}
          color="success"
          size="sm"
          radius="sm"
          variant="flat"
          onClose={deleteReviewer}
        >
          {`${reviewer.reviewerId.name} ${reviewer.reviewerId.fatherLastName}`}
        </Chip>
      ) : (
        <Chip
          avatar={<Avatar color="success" />}
          color="success"
          size="sm"
          radius="sm"
          variant="flat"
        >
          {`${reviewer.reviewerId.name} ${reviewer.reviewerId.fatherLastName}`}
        </Chip>
      )}
    </>
  );
};
