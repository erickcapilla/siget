import { DoublePanelLayout } from "@/layouts";
import {
  DocumentForm,
  DocumentViewer,
  CommentList,
  EditDocumentForm,
} from "@/components/features";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import documentCommentsServices from "@/services/DocumentCommentsServices";
import documentServices from "@/services/DocumentServices";
import { CommentResponse, DocumentResponse } from "@/types/topic";
import { Spinner } from "@nextui-org/react";

export const UserDocument = () => {
  const { token, acceptedTopics } = useAuth();
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [document, setDocument] = useState<DocumentResponse[]>([]);

  const getComments = (documentID: string) => {
      documentCommentsServices
        .getComments(token, documentID)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setComments(data.result);
        })
        .catch((error) => console.error(error));
      };

  useEffect(() => {
    documentServices
      .getUserDocuments(token)
      .then((res) => res.json())
      .then((data) => {
        setDocument(data);
        getComments(data[0].id);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {acceptedTopics.length > 0 ? (
        <DoublePanelLayout
          title="Documento"
          contentLeft={
            <div className="size-full flex flex-col justify-between">
              <div className="h-full">
                {comments.length > 0 ? (
                  <CommentList
                    comments={comments}
                    setComments={setComments}
                  />
                ) : (
                  <p>No hay comentarios</p>
                )}
              </div>
              <div className="max-h-80">
                <h3 className="text-xs text-primary font-bold mb-3">
                  {" "}
                  {document
                    ? "Agrega una nueva versión de tu documento"
                    : "Agrega tu documento"}{" "}
                </h3>
                {document ? (
                  <EditDocumentForm id={document[0]?.id} />
                ) : (
                  <DocumentForm id={acceptedTopics[0].id} />
                )}
              </div>
            </div>
          }
          subtitleLeft="Presiona para ver comentarios o agregar nueva versión"
          titleLeft="Comentarios"
        >
          {document.length > 0 ? (
            <DocumentViewer pdfFilePath={document[0].url} />
          ) : (
            <p> No hay documento </p>
          )}
        </DoublePanelLayout>
      ) : (
        <Spinner />
      )}
    </>
  );
};
