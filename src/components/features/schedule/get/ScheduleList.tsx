import { ScheduleItem } from "@/components/features";
import { AppointmentResponse } from "@/types/schedule";

interface Props {
  setUsersAppointments: React.Dispatch<React.SetStateAction<AppointmentResponse[]>>;
  appointments: AppointmentResponse[];
}

export const ScheduleList = ({ setUsersAppointments, appointments }: Props) => {
  return (
    <>
      {appointments?.map((appointment) => (
        <ScheduleItem key={appointment.id} appointment={appointment} setUsersAppointments={setUsersAppointments} />
      ))}
    </>
  );
};
