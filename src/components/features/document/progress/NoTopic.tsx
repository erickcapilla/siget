import { ShieldExclamation } from "@/components/icons";
import { Button, Link } from "@nextui-org/react";

export const NoTopic = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full">
      <ShieldExclamation size={100} color="#F31260" />
      <strong>Aún no tienes un tema asignado</strong>
      <Button
        as={Link}
        href="/topics"
        variant="solid"
        color="primary"
        radius="sm"
        className="max-w-xs w-full"
      >
        Temas disponibles
      </Button>
    </div>
  );
};
