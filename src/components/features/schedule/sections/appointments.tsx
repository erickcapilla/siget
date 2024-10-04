import type { AppointmentResponse } from "@/types/schedule";
import { useEffect, useState } from "react";
import scheduleServices from "@/services/ScheduleServices";
import { useAuth } from "@/hooks/useAuth";
import { ScheduleList } from "@/components/features";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserAppointments: React.Dispatch<
    React.SetStateAction<AppointmentResponse[]>
  >;
  userAppointments: AppointmentResponse[];
}

export const Appointments = ({
  setIsLoading,
  setUserAppointments,
  userAppointments,
}: Props) => {
  const { token } = useAuth();
  const [invitations, setInvitations] = useState<AppointmentResponse[]>([]);
  const appointments = userAppointments.filter((appointment) => {
    return invitations.some((invitation) => invitation.id !== appointment.id);
  });

  useEffect(() => {
    setIsLoading(true);
    scheduleServices
      .getPetitionAppointment(token)
      .then((response) => response.json())
      .then((data) => setInvitations(data.schedules))
      .catch((error) => console.error(error));

    scheduleServices
      .getRequestAppointment(token)
      .then((response) => response.json())
      .then((data) => setUserAppointments(data.schedules))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="grid gap-3">
      {appointments.length > 0 ? (
        <ScheduleList
          setUsersAppointments={setUserAppointments}
          appointments={appointments}
        />
      ) : (
        <p>No hay citas</p>
      )}
    </div>
  );
};
