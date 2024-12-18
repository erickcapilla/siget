import type { CommentResponse } from "@/types/topic";
import { LayoutItem } from "@/layouts";
import { DeleteIcon, CalendarIcon, ClockIcon } from "@/components/icons";
import { Chip, Button } from "@nextui-org/react";
import { useAuth } from "@/hooks";
import documentCommentsServices from "@/services/DocumentCommentsServices";
import toast from "react-hot-toast";
import { ROLES } from "@/utils";
import { useState } from "react";
import { formatDay, formatTime } from "@/utils";

interface Props {
  comment: CommentResponse;
  setComments: React.Dispatch<React.SetStateAction<CommentResponse[]>>;
}

export const CommentItem = ({ comment, setComments }: Props) => {
  const { token, role } = useAuth();
  const [loading, setLoading] = useState(false);

  const deleteComment = () => {
    setLoading(true);
    documentCommentsServices
      .deleteComment(token, comment.id)
      .then(() => toast.success("Comentario eliminado"))
      .then(() =>
        setComments((prev) => prev.filter((c) => c.id !== comment.id))
      )
      .catch((error) => toast.error(error.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <LayoutItem className="border-primary text-sm items-center">
      <article className="flex flex-col gap-3">
        <h2>{comment.comment}</h2>
        <section className="flex gap-2">
          <Chip
            startContent={<CalendarIcon size={15} color="#bfbfbf" />}
            variant="flat"
            size="sm"
            className="text-gray-500"
          >
            {formatDay(comment.date)}
          </Chip>
          <Chip
            startContent={<ClockIcon size={15} color="#bfbfbf" />}
            variant="flat"
            size="sm"
            className="text-gray-500"
          >
            {formatTime(comment.date)}
          </Chip>
        </section>
      </article>
      <article>
        {(role === ROLES.ADVISOR ||
          role === ROLES.REVIEWER) && (
            <Button
              size="sm"
              variant="flat"
              color="danger"
              isIconOnly
              className="bg-transparent"
              isLoading={loading}
              onPress={() => {
                toast((t) => (
                  <span>
                    ¿Estás seguro de eliminar el comentario?
                    <Button
                      className="m-2"
                      color="danger"
                      size="sm"
                      variant="flat"
                      onPress={() => {
                        deleteComment();
                        toast.dismiss(t.id);
                      }}
                    >
                      Eliminar
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
              <DeleteIcon />
            </Button>
          )}
      </article>
    </LayoutItem>
  );
};
