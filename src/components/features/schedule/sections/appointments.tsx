import type { AppointmentResponse } from "@/types/schedule";
import { useEffect } from "react";
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

  useEffect(() => {
    setIsLoading(true);
    scheduleServices
      .getRequestAppointment(token)
      .then((response) => response.json())
      .then((data) => setUserAppointments(data.schedules))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="grid gap-3">
      {userAppointments.length > 0 ? (
        <ScheduleList
          setUsersAppointments={setUserAppointments}
          appointments={userAppointments}
        />
      ) : (
        <p>No hay citas</p>
      )}
    </div>
  );
};
