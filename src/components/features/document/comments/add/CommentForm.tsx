import { Textarea, Button } from "@nextui-org/react";
import documentCommentsServices from "@/services/DocumentCommentsServices";
import { useState } from 'react'

interface Props {
  id: string;
}

export const CommentForm = ({ id }: Props) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    documentCommentsServices.saveComment(comment, id);
  };

  return (
    <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
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
        >
          Agregar Comentario
        </Button>
      </div>
    </form>
  );
};
