import { DoublePanelLayout } from "@/layouts";
import { Panel } from "@components/features/ui";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { AdviceForm, AdviceList } from "@/components/features";
import advisoryServices from "@/services/AdvisoryServices";
import { useAuth } from '@/hooks'
import { useEffect, useState } from "react";

 
export const Advice = () => {
  const { token } = useAuth();
  const [advisories, setAdvisories] = useState([])

  useEffect(() => {
    advisoryServices.getAdvisories(token, "b055a2b8-f69c-4cf0-81b2-48f86389f431")
      .then(res => res.json())
      .then((advisories) => setAdvisories(advisories))
      .catch((error) => console.error(error))
  }, [])

  return (
    <DoublePanelLayout>
      <div className="max-[639px]:hidden h-full w-full">
        <Panel title="Agregar asesoría">
          <AdviceForm setAdvisories={setAdvisories} />
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
            <AdviceForm setAdvisories={setAdvisories} />
          </AccordionItem>
        </Accordion>
      </div>
      <div className="min-[640px]:min-w-[70%] h-full">
        <Panel title="Asesorías">
          { advisories.length > 0 ? <AdviceList advisories={advisories} setAdvisories={setAdvisories} /> : <p>No hay asesorías</p> }
        </Panel>
      </div>
    </DoublePanelLayout>
  )
}