import { Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import reviewerService from "@/services/ReviewerServices";
import { useAuth } from "@/hooks/useAuth";
import { ReviewersSelect } from "@/components/features";
import { ReviewerResponse } from "@/types/reviewer";

interface Props {
  topicId: string;
  setReviewers?: React.Dispatch<React.SetStateAction<ReviewerResponse[]>>;
}

export const AddReviewerForm = ({ topicId, setReviewers }: Props) => {
  const [reviewer, setReviewer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = (e: React.FormEvent<EventTarget | HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    reviewerService
      .setReviewer(token, topicId, reviewer)
      .then((res) => res.json())
      .then((data) => {
        setReviewers && setReviewers((prev) => [...prev, data]);
      })
      .then(() => toast.success("Revisor asignado"))
      .catch((error) => toast.error(error.toString()))
      .finally(() => setIsLoading(false));
  };

  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <ReviewersSelect onChange={(e) => setReviewer(e.toString())} />
      <Button
        className="w-full"
        radius="sm"
        color="primary"
        variant="solid"
        type="submit"
        isLoading={isLoading}
      >
        Agregar
      </Button>
    </form>
  );
};
