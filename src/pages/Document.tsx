import { Layout } from "@/components/layouts";
import { Panel } from "@components/features/ui";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  DocumentForm,
  DocumentViewer,
  CommentList,
  CommentForm,
} from "@/components/features";
import { useUser } from "@/hooks";

export const Document = () => {
  const { role } = useUser();

  return (
    <Layout>
      <div className="max-[639px]:hidden h-full w-full">
        <Panel title="Agregar nueva versión">
          {role === "ASESOR_ROLE" ? <CommentForm /> : <DocumentForm />}
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
            title="Agregar nueva versión"
            aria-label="Accordion form"
            subtitle="Presiona para agregar una nueva versión del documento"
          >
            {role === "ASESOR_ROLE" ? <CommentForm /> : <DocumentForm />}
          </AccordionItem>
        </Accordion>
      </div>
      <div className="min-[640px]:min-w-[70%] h-full">
        <Panel title="Documento" className="relative">
          <article className="flex">
            <DocumentViewer />
            <section className="shrink w-full sticky max-w-[50%] right-0 top-0 h-[50%] overflow-y-auto">
              <h1 className="rounded-t-md bg-gray-100 mb-3 p-2 text-center text-gray-600 font-bold">
                Comentarios
              </h1>
              <div className="top-0 w-full grid gap-3">
                <CommentList />
              </div>
            </section>
          </article>
        </Panel>
      </div>
    </Layout>
  );
};
