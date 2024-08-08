import { DoublePanelLayout } from "@/layouts";
import { Panel } from "@components/features/ui";
import { Accordion, AccordionItem, Calendar } from "@nextui-org/react";
import { ScheduleForm, ScheduleList } from "@/components/features";
import { today, getLocalTimeZone } from "@internationalized/date";

export const Schedule = () => {
  const localDate = today(getLocalTimeZone());

  return (
    <DoublePanelLayout>
      <div className="max-[639px]:hidden h-full w-full">
        <Panel title="Agregar cita">
          <ScheduleForm />
        </Panel>
      </div>
      <div className="min-[640px]:hidden h-auto">
        <Accordion
          variant="shadow"
          itemClasses={{
            title: "text-primary font-bold",
            subtitle: "text-gray-500",
          }}
        >
          <AccordionItem
            title="Agregar cita"
            aria-label="Accordion form"
            subtitle="Presiona para agendar una cita"
          >
            <ScheduleForm />
          </AccordionItem>
        </Accordion>
      </div>
      <div className="min-[640px]:min-w-[70%] h-full">
        <Panel title="Citas">
          <Calendar
            aria-label="Date (No Selection)"
            defaultValue={localDate}
            visibleMonths={3}
            isReadOnly
            showShadow={true}
            className="shadow-none rounded-sm"
          />
          <div className="mt-3 h-[200px] overflow-y-auto">
            <ScheduleList />
          </div>
        </Panel>
      </div>
    </DoublePanelLayout>
  );
};
