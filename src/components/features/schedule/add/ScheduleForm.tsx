import { Input, Button, TimeInput, DateInput } from "@nextui-org/react";

export const ScheduleForm = () => {
  return (
    <form className="flex flex-col justify-between h-full">
      <div className="grid gap-3">
        <Input
          label="Asunto"
          placeholder="Ingresa el asunto de la cita"
          variant="bordered"
          color="primary"
          radius="sm"
          isRequired
        />
        <Input
          label="Lugar"
          placeholder="Ingresa el lugar de la cita"
          variant="bordered"
          color="primary"
          radius="sm"
          isRequired
        />
        <DateInput
          label="Fecha de la cita"
          variant="bordered"
          color="primary"
          radius="sm"
          isRequired
        />
        <TimeInput
          label="Hora de la cita"
          variant="bordered"
          color="primary"
          radius="sm"
          isRequired
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
          Agendar
        </Button>
      </div>
    </form>
  );
};
