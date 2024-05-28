import { Textarea, Button } from "@nextui-org/react";

export const CommentForm = () => {
  return (
    <form className="flex flex-col justify-between h-full">
      <div>
        <Textarea label="Comentario" placeholder="Ingresa tu comentario" color="primary" variant="bordered" radius="sm" />
      </div>
      <div>
        <Button type="submit" color="primary" variant="solid" radius="sm" className="w-full">
          Agregar Comentario
        </Button>
      </div>
    </form>
  )
}