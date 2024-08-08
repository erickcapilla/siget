import { ShieldExclamation } from "@/components/icons";
import { Button, Link } from "@nextui-org/react";

export const NoDegree = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full">
      <ShieldExclamation size={100} color="#F31260" />
      <strong>Aún no inicias tu proceso de titulación</strong>
      <Button
        as={Link}
        href="/degree"
        variant="solid"
        color="primary"
        radius="sm"
        className="max-w-xs w-full"
      >
        Elige tipo de titulación
      </Button>
    </div>
  );
};
