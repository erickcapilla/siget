import { LayoutItem } from "@/layouts";
import { Button } from "@nextui-org/react";

export const OptionItem = ({ name, description }) => {
  return (
    <LayoutItem className="border-primary flex-col">
      <h3 className="text-center font-semibold">{name}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <Button className="mt-4 font-semibold" color="primary" variant="flat" radius="sm">
        Seleccionar
      </Button>
    </LayoutItem>
  );
};
