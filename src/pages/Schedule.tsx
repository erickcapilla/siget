import type { AppointmentResponse } from "@/types/schedule";
import { DoublePanelLayout } from "@/layouts";
import { ScheduleForm } from "@/components/features";
import { Chip, Button } from "@nextui-org/react";
import { useState } from "react";
import { Appointments, Invitations } from "@/components/features";

export const Schedule = () => {
  const [section, setSection] = useState("appointments");
  const [isLoading, setIsLoading] = useState(false);
  const [userAppointments, setUserAppointments] = useState<
    AppointmentResponse[]
  >([]);

  const handleView = async (type: string) => {
    setSection(type);
  };
  return (
    <DoublePanelLayout
      title="Citas"
      titleLeft="Agrega una nueva cita"
      subtitleLeft="Presiona para gregar una nueva cita"
      contentLeft={<ScheduleForm setUserAppointments={setUserAppointments} />}
    >
      <article className="w-full grid gap-3">
        <section className="w-full flex gap-3 overflow-auto scrollbar-hide">
          <Chip
            as={Button}
            size="md"
            variant="flat"
            color={section === "appointments" ? "primary" : "default"}
            onPress={() => handleView("appointments")}
            isLoading={section === "appointments" && isLoading}
          >
            Mis citas
          </Chip>
          <Chip
            as={Button}
            size="md"
            variant="flat"
            color={section === "invitations" ? "primary" : "default"}
            onPress={() => handleView("invitations")}
            isLoading={section === "invitations" && isLoading}
          >
            Invitaciones
          </Chip>
        </section>
        {section === "appointments" && (
          <Appointments
            setIsLoading={setIsLoading}
            setUserAppointments={setUserAppointments}
            userAppointments={userAppointments}
          />
        )}
        {section === "invitations" && (
          <Invitations
            setIsLoading={setIsLoading}
          />
        )}
      </article>
    </DoublePanelLayout>
  );
};
