import { SelectRole } from "@components/features/ui";
import { Input, Button } from "@nextui-org/react";

export const AccessForm = () => {
  return (
    <form className="grid gap-y-5 text-black">
      <Input
        color="primary"
        radius="sm"
        variant="bordered"
        placeholder="Ingresa tu correo electrónico"
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        autoFocus
      />
      <SelectRole />
      <Button type="submit" variant="solid" color="primary" radius="sm">
        Solicitar
      </Button>
    </form>
  );
};
