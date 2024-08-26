import { Textarea, Button } from "@nextui-org/react";
import documentCommentsServices from "@/services/DocumentCommentsServices";
import { useState } from 'react'
import { CommentResponse } from "@/types/topic";
import { useAuth } from "@/hooks";
import toast from "react-hot-toast";

interface Props {
  id: string;
  setComments: React.Dispatch<React.SetStateAction<CommentResponse[]>>;
}

export const CommentForm = ({ id, setComments }: Props) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    documentCommentsServices.saveComment(token, comment, id)
      .then(res => res.json())
      .then(data => setComments(prev => [data, ...prev]))
      .then(() => {
        setComment("");
        toast.success("Comentario agregado");
      })
      .catch(error => toast.error(error.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <div>
        <Textarea
          label="Comentario"
          placeholder="Ingresa tu comentario"
          color="primary"
          variant="bordered"
          radius="sm"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>
      <div>
        <Button
          type="submit"
          color="primary"
          variant="solid"
          radius="sm"
          className="w-full"
          isLoading={loading}
        >
          Agregar Comentario
        </Button>
      </div>
    </form>
  );
};
