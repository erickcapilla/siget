import { Layout } from "@/components/layouts";
import { Panel } from "@components/features/ui";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  DocumentForm,
  DocumentViewer,
  CommentList,
  CommentForm,
} from "@/components/features";
import { useUser, useAuth } from "@/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import documentCommentsServices from "@/services/DocumentCommentsServices";

export const Document = () => {
  const { role, getUserDocument, document } = useUser();
  const { token } = useAuth()
  const { id } = useParams();
  const [comments, setComments] = useState([]);


  useEffect(() => {
    getUserDocument();
    documentCommentsServices
      .getComments(token, "be4e1e4a-c900-405c-9c7a-aa4649edfb40")
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Layout>
      <div className="max-[639px]:hidden h-full w-full">
        <Panel title="Agregar nueva versión">
          {role === "ASESOR_ROLE" ? (
            <CommentForm id={document[0].id} />
          ) : (
            <DocumentForm id={id} />
          )}
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
            {role === "ASESOR_ROLE" ? (
              <CommentForm id={document[0].id} />
            ) : (
              <DocumentForm id={id} />
            )}
          </AccordionItem>
        </Accordion>
      </div>
      <div className="min-[640px]:min-w-[70%] h-full">
        <Panel title="Documento" className="relative">
          <article className="flex">
            <DocumentViewer document={document[0]} />
            <section className="shrink sticky max-w-[50%] min-w-[30%] w-full right-0 top-0 h-[50%] overflow-y-auto">
              <h1 className="rounded-t-md bg-gray-100 mb-3 p-2 text-center text-gray-600 font-bold">
                Comentarios
              </h1>
              <div className="top-0 w-full grid gap-3">
                {document[0].id !== null && <CommentList comments={comments} />}
              </div>
            </section>
          </article>
        </Panel>
      </div>
    </Layout>
  );
};
