import { ShieldExclamation } from "@/assets/icons";
import { Button, Link } from "@nextui-org/react";

export const NoAppointments = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <ShieldExclamation size={100} color="#F31260" />
      <strong>No tienes citas</strong>
      <Button
        as={Link}
        href="/schedule"
        variant="solid"
        color="primary"
        radius="sm"
        className="w-full"
      >
        Agenda una cita
      </Button>
    </div>
  );
};
