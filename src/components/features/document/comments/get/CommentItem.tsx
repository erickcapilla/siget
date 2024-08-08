import { LayoutItem } from "@/layouts";
import { Comment, CommentResponse } from "@/types";
import { DeleteIcon, CalendarIcon, ClockIcon } from "@/components/icons";
import { Chip, Button } from "@nextui-org/react";
import { useUser } from "@/hooks";
import documentCommentsServices from "@/services/DocumentCommentsServices";

interface Props {
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<CommentResponse>>;
}

export const CommentItem = ({ comment, setComments }: Props) => {
  const { role } = useUser();
  const dateString = comment.date;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  const deleteComment = () => {
    documentCommentsServices.deleteComment(comment.id)
      .then(() => console.log("Comment deleted"))
      .then(() => setComments(prev => {
        return {
          ...prev,
          result: prev.result.filter(c => c.id !== comment.id)
        };
      }))
      .catch(error => console.error(error));
  };

  return (
    <LayoutItem className="border-primary text-sm items-center">
      <article className="flex flex-col gap-3">
        <h2>{comment.comment}</h2>
        <section className="flex gap-2">
          <Chip
            startContent={<CalendarIcon size={15} color="#bfbfbf" />}
            variant="bordered"
            size="sm"
            className="text-gray-500"
          >
            {formattedDate}
          </Chip>
          <Chip
            startContent={<ClockIcon size={15} color="#bfbfbf" />}
            variant="bordered"
            size="sm"
            className="text-gray-500"
          >
            {formattedTime}
          </Chip>
        </section>
      </article>
      <article>
        {role === "ASESOR_ROLE" && (
          <Button
            size="sm"
            variant="flat"
            color="danger"
            isIconOnly
            className="bg-transparent"
            onPress={deleteComment}
          >
            <DeleteIcon />
          </Button>
        )}
      </article>
    </LayoutItem>
  );
};
