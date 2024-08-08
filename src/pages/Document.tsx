import { DoublePanelLayout } from "@/layouts";
import { Panel } from "@components/features/ui";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
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
import documentServices from "@/services/DocumentServices";
import { CommentResponse } from "@/types";

export const Document = () => {
  const { role, getUserDocument, document, setDocument } = useUser();
  const { token } = useAuth();
  const { id } = useParams();
  const [comments, setComments] = useState<CommentResponse>();
  console.log(document);

  const getNextChapter = () => {
    let chapter = "";

    if (chapter === "") chapter = "Cap. 1";
    if (document[0].chapter1) chapter = "Cap. 2";
    if (document[0].chapter2) chapter = "Cap. 3";
    if (document[0].chapter3) chapter = "Cap. 4";
    if (document[0].chapter4) chapter = "Cap. 5";
    if (document[0].chapter5) chapter = "Cap. 6";
    if (document[0].chapter6) chapter = "Cap. 7";

    return chapter;
  };

  const getComments = () => {
    documentCommentsServices
      .getComments(token, document[0].id)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((error) => console.error(error));
  };

  const nextChapter = () => {
    let chapter = 0;

    if (document[0].chapter1) chapter = 2;
    if (document[0].chapter2) chapter = 3;
    if (document[0].chapter3) chapter = 4;
    if (document[0].chapter4) chapter = 5;
    if (document[0].chapter5) chapter = 6;
    if (document[0].chapter6) chapter = 7;
    //documentServices.updateChapter(token, chapter, document[0].id)
      //.then(() => setDocument(prev => [...prev, ]))
  }

  useEffect(() => {
    getUserDocument();
    getComments();
  }, []);

  return (
    <DoublePanelLayout>
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
            {document && <DocumentViewer document={document[0]} />}
            <section className="shrink sticky max-w-[50%] min-w-[30%] w-full right-0 top-0 h-[50%] overflow-y-auto pr-2">
              <h1 className="rounded-t-md bg-gray-100 mb-3 p-2 text-center text-gray-700 font-bold border-primary border-t-3 border-l-3">
                Comentarios
              </h1>
              <div className="top-0 w-full grid gap-3">
                {comments && (
                  <CommentList
                    comments={comments.result}
                    setComments={setComments}
                  />
                )}
              </div>
              
            </section>
          </article>
        </Panel>
      </div>
    </DoublePanelLayout>
  );
};

/*
<section>
                <Button
                  color="primary"
                  variant="solid"
                  size="sm"
                  className="mt-2 font-bold"
                  onPress={nextChapter()}
                >
                  {`Aprobar capitulo ${getNextChapter()}`}{" "}
                </Button>
              </section>
*/