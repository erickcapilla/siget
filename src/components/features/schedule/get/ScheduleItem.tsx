import { CalendarIcon, LocationIcon, ClockIcon } from "@icons/index";
import { LayoutItem } from "@/components/layouts";

export const ScheduleItem = () => {
  const sizeIcon = 18;
  return (
    <LayoutItem className="border-l-primary">
      <div className="w-full h-full text-sm">
        <div className="text-base">
          <strong> Revisión - Presencial </strong>
        </div>
        <div className="grid gap-2">
          <article className="flex items-center gap-1">
            <LocationIcon size={sizeIcon} /> <p>Cúbiculo del asesor</p>
          </article>
          <article className="flex gap-2 w-full">
            <div className="flex items-center gap-1">
              <CalendarIcon size={sizeIcon} /> 15/09/2021
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon size={sizeIcon} /> 10:00 P.M
            </div>
          </article>
        </div>
      </div>
    </LayoutItem>
  );
};
