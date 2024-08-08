import { CalendarIcon, LocationIcon, ClockIcon } from "@/components/icons/index";
import { LayoutItem } from "@/layouts";

interface Props {
  appointment: {}
}

export const ScheduleItem = ({ appointment }: Props) => {
  console.log(appointment)
  const sizeIcon = 18;
  return (
    <LayoutItem className="border-l-primary">
      <div className="w-full h-full text-sm">
        <div className="text-base">
          <strong> {appointment.topic} </strong>
        </div>
        <div className="grid gap-2">
          <article className="flex items-center gap-1">
            <LocationIcon size={sizeIcon} /> <p>{appointment.location}</p>
          </article>
          <article className="flex gap-2 w-full">
            <div className="flex items-center gap-1">
              <CalendarIcon size={sizeIcon} /> {appointment.date}
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon size={sizeIcon} /> {appointment.time}
            </div>
          </article>
        </div>
      </div>
    </LayoutItem>
  );
};
