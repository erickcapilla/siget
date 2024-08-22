import { InvitationItem } from "@/components/features";
import { AppointmentResponse } from "@/types/schedule";

interface Props {
  setUsersAppointments: React.Dispatch<React.SetStateAction<AppointmentResponse[]>>;
  appointments: AppointmentResponse[];
}

export const InvitationsList = ({ setUsersAppointments, appointments }: Props) => {
  return (
    <>
      {appointments?.map((appointment) => (
        <InvitationItem key={appointment.id} appointment={appointment} setUsersAppointments={setUsersAppointments} />
      ))}
    </>
  );
};
