import { ScheduleList } from "@/components/features/schedule";
import { CardUI } from "@/components/features";

export const ScheduleCard = () => {
  return (
    <CardUI title="Agenda" className="w-full max-w-96 max-h-70">
      <ScheduleList />
    </CardUI>
  );
};
