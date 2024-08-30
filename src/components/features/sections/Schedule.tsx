import {
  ScheduleList,
  InvitationsList,
  NotFoundLayout,
} from "@/components/features";
import { Spinner } from "@nextui-org/react";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { AppointmentResponse } from "@/types/schedule";
import scheduleServices from "@/services/ScheduleServices";
import { Schedule } from "@/components/unDraws";

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
    <div className="w-full grid gap-2">
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
        <NotFoundLayout
          title="Sin citas"
          description="No tienes citas programadas aún"
        >
          <Schedule className="size-32" />
        </NotFoundLayout>
      )}
    </div>
  );
};
