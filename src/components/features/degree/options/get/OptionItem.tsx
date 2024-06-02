import { LayoutItem } from "@/components/layouts";
import { Button } from "@nextui-org/react";

export const OptionItem = ({ name, description }) => {
  return (
    <LayoutItem className="border-secondary flex-col">
      <h3 className="text-center font-semibold">{name}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <Button className="mt-4 font-semibold" color="secondary" variant="flat" radius="sm">
        Seleccionar
      </Button>
    </LayoutItem>
  );
};
