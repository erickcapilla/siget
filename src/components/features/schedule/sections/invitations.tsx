import type { AppointmentResponse } from "@/types/schedule";
import { useEffect, useState } from "react";
import scheduleServices from "@/services/ScheduleServices";
import { useAuth } from "@/hooks/useAuth";
import { InvitationsList } from "@/components/features";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Invitations = ({
  setIsLoading,
}: Props) => {
  const { token } = useAuth();
  const [userAppointments, setUserAppointments] = useState<AppointmentResponse[]>([]);

  useEffect(() => {
    setIsLoading(true);
    scheduleServices
      .getPetitionAppointment(token)
      .then((response) => response.json())
      .then((data) => setUserAppointments(data.schedules))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="grid gap-3">
      {userAppointments.length > 0 ? (
        <InvitationsList
          setUsersAppointments={setUserAppointments}
          appointments={userAppointments}
        />
      ) : (
        <p>No hay invitaciones</p>
      )}
    </div>
  );
};
