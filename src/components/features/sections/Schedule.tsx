import { ScheduleList } from "@/components/features/schedule";
import { Panel } from "@/components/features";

export const ScheduleSection = () => {
  return (
    <Panel title="Agenda" className="w-full h-full">
      <ScheduleList />
    </Panel>
  );
};
