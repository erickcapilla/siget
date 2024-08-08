import { ShieldExclamation } from "@/components/icons";
import { Button, Link } from "@nextui-org/react";

export const NoAppointments = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-2 h-full">
      <ShieldExclamation color="#F31260" className="size-full" />
      <strong>Sin citas</strong>
      <Button
        as={Link}
        href="/schedule"
        variant="solid"
        color="primary"
        radius="sm"
        className="w-full h-16"
      >
        Agenda una cita
      </Button>
    </div>
  );
};
