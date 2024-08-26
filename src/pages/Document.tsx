import type { DocumentResponse, CommentResponse } from "@/types/topic";
import { DoublePanelLayout } from "@/layouts";
import { Button } from "@nextui-org/react";
import {
  DocumentViewer,
  CommentList,
  CommentForm,
} from "@/components/features";
import { useAuth } from "@/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import documentCommentsServices from "@/services/DocumentCommentsServices";
import documentServices from "@/services/DocumentServices";
import { ROLES } from "@/utils";

export const Document = () => {
  const { token, role } = useAuth();
  const { id } = useParams();
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [document, setDocument] = useState<DocumentResponse>();

  const getComments = (DocumentID: string) => {
    documentCommentsServices
      .getComments(token, DocumentID)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComments(data.result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    documentServices
      .getStudentDocument(token, id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDocument(data);
        getComments(data.id);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <DoublePanelLayout
      title="Documento"
      contentLeft={
        <div className="size-full flex gap-3 flex-col justify-between">
          {comments.length > 0 ? (
            <div className="size-full flex flex-col gap-2 overflow-y-auto">
              <CommentList comments={comments} setComments={setComments} />
            </div>
          ) : (
            <p>No hay comentarios</p>
          )}
          {role === ROLES.ADVISOR && (
            <div className="w-full grid gap-2">
              <CommentForm id={document?.id} setComments={setComments} />
              <Button className="w-full" radius="sm" color="success" variant="flat">
                Aprobar capítulo 1
              </Button>
            </div>
          )}
        </div>
      }
      subtitleLeft="Presiona para ver comentarios o agregar nueva versión"
      titleLeft="Comentarios"
    >
      {document ? (
        <DocumentViewer pdfFilePath={document.url} />
      ) : (
        <p> No hay documento </p>
      )}
    </DoublePanelLayout>
  );
};
