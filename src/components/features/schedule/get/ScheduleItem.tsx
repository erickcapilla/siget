import {
  CalendarIcon,
  LocationIcon,
  ClockIcon,
} from "@/components/icons/index";
import { LayoutItem } from "@/layouts";
import { AppointmentResponse } from "@/types/schedule";
import { Chip, Avatar } from "@nextui-org/react";

interface Props {
  setUsersAppointments: React.Dispatch<
    React.SetStateAction<AppointmentResponse[]>
  >;
  appointment: AppointmentResponse;
}

export const ScheduleItem = ({ appointment }: Props) => {
  const statusES = { ACCEPTED: "Aceptada", PENDING: "Pendiente" };
  const sizeIcon = 18;

  return (
    <LayoutItem className="border-l-primary">
      <div className="w-full h-full text-sm grid gap-2">
        <div className="text-base">
          <strong> {appointment.topic} </strong>
        </div>
        <article className="flex gap-3 flex-wrap w-full">
          <div className="flex items-center gap-1">
            <LocationIcon size={sizeIcon} /> <p>{appointment.location}</p>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon size={sizeIcon} /> {appointment.date}
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon size={sizeIcon} /> {appointment.time}
          </div>
          <div>
            <Chip
              size="sm"
              avatar={<Avatar color="secondary" />}
              color="secondary"
              variant="flat"
            >
              {" "}
              {`${appointment.invitee.name} ${appointment.invitee.fatherLastName}`}{" "}
            </Chip>
          </div>
          <div>
            <Chip
              size="sm"
              color={appointment.status === "ACCEPTED" ? "success" : "danger"}
              variant="flat"
            >
              {" "}
              {statusES[appointment.status]}{" "}
            </Chip>
          </div>
        </article>
      </div>
    </LayoutItem>
  );
};
