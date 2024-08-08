import { DoublePanelLayout } from "@/layouts";
import { Panel } from "@components/features/ui";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  Menu,
  PersonalForm,
  StudentForm,
  Details,
  Information,
} from "@/components/features";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const [menu, setMenu] = useState("personal");
  const { id } = useParams();

  return (
    <DoublePanelLayout>
      <div className="max-[639px]:hidden h-full w-full">
        <Panel title="">
          {id ? <Details id={id} /> : <Menu setMenu={setMenu} />}
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
            title="Mi perfil"
            aria-label="Accordion form"
            subtitle="Presiona para navegar en tu información"
          >
            {id ? <Details id={id} /> : <Menu setMenu={setMenu} />}
          </AccordionItem>
        </Accordion>
      </div>
      <div className="min-[640px]:min-w-[70%] h-full">
        {id ? (
          <Panel title="Información detallada">
            <Information id={id} />
          </Panel>
        ) : (
          <Panel
            title={
              menu === "personal"
                ? "Información personal"
                : "Información estudiantil"
            }
          >
            {menu === "personal" ? <PersonalForm /> : <StudentForm />}
          </Panel>
        )}
      </div>
    </DoublePanelLayout>
  );
};
