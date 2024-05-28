import { Input, Button, DateInput, Textarea } from "@nextui-org/react";

export const AdviceForm = () => {
  return (
    <form className="flex flex-col justify-between h-full">
      <div className="grid gap-3">
      <Input
        isRequired
        label="Tema revisado"
        placeholder="Ingresa el tema revisado"
        color="primary"
        variant="bordered"
        radius="sm"
      />
      <Textarea
        isRequired
        label="Observaciones"
        placeholder="Ingresa las observaciones"
        color="primary"
        variant="bordered"
        radius="sm"
      />
      <DateInput
        isRequired
        label="Fecha de revisión"
        color="primary"
        variant="bordered"
        radius="sm"
      />
      </div>
      <div>
        <Button color="primary" variant="solid" radius="sm" className="w-full">Agregar</Button>
      </div>
    </form>
  );
};
