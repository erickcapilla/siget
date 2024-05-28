import { Layout } from "@/components/layouts";
import { Panel } from "@components/features/ui";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { AdviceForm, AdviceList } from "@/components/features";

 
export const Advice = () => {
  return (
    <Layout>
      <div className="max-[639px]:hidden h-full w-full">
        <Panel title="Agregar asesoría">
          <AdviceForm />
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
            title="Agregar asesoría"
            aria-label="Accordion form"
            subtitle="Presiona para agregar asesoría"
          >
            <AdviceForm />
          </AccordionItem>
        </Accordion>
      </div>
      <div className="min-[640px]:min-w-[70%] h-full">
        <Panel title="Asesorías">
          <AdviceList />
        </Panel>
      </div>
    </Layout>
  )
}