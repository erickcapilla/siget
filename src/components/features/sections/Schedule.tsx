import { ScheduleList, InvitationsList } from "@/components/features/schedule";
import { Spinner } from "@nextui-org/react";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { AppointmentResponse } from "@/types/schedule";
import scheduleServices from "@/services/ScheduleServices";

export const ScheduleSection = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [invitations, setInvitations] = useState<AppointmentResponse[]>([]);

  useEffect(() => {
    setLoading(true);
    scheduleServices
      .getRequestAppointment(token)
      .then((response) => response.json())
      .then((data) => setAppointments(data.schedules))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

    scheduleServices
      .getPetitionAppointment(token)
      .then((response) => response.json())
      .then((data) => setInvitations(data.schedules))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="size-full grid gap-2">
      {loading && <Spinner />}
      {!loading && appointments.length > 0 && (
        <ScheduleList
          setUsersAppointments={setAppointments}
          appointments={appointments}
        />
      )}
      {!loading && invitations.length > 0 && (
        <InvitationsList
          setUsersAppointments={setInvitations}
          appointments={invitations}
        />
      )}
      {!loading && !appointments.length && !invitations.length && (
        <p>No hay citas</p>
      )}
    </div>
  );
};
