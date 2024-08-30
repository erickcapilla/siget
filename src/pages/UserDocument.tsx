import { DoublePanelLayout } from "@/layouts";
import {
  DocumentForm,
  DocumentViewer,
  CommentList,
  EditDocumentForm,
  EditAcceptedTopic,
} from "@/components/features";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import documentCommentsServices from "@/services/DocumentCommentsServices";
import documentServices from "@/services/DocumentServices";
import { CommentResponse, DocumentResponse, TopicResponse } from "@/types/topic";
import { Spinner, Button, Chip } from "@nextui-org/react";
import { formatDate } from "@/utils"

export const UserDocument = () => {
  const { token, acceptedTopics } = useAuth();
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [document, setDocument] = useState<DocumentResponse[]>([]);
  const [loading, setLoading] = useState(true);

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
        console.log(data);

        if (data.length > 0) {
          getComments(data[0].id);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DoublePanelLayout
      title="Documento"
      contentLeft={
        <div className="size-full flex flex-col justify-between">
          <div className="h-full overflow-y-auto pr-2 flex flex-col gap-2">
            {document && comments.length > 0 ? (
              <CommentList comments={comments} setComments={setComments} />
            ) : (
              <p>No hay comentarios</p>
            )}
          </div>
          <div className="max-h-80 grid gap-2">
            <h3 className="text-xs text-primary font-bold mb-3">
              {" "}
              {document.length > 0
                ? "Agrega una nueva versión de tu documento"
                : "Agrega tu documento"}{" "}
            </h3>
            {document.length > 0 ? (
              <EditDocumentForm id={document[0]?.id} setDocument={setDocument} />
            ) : (
              <DocumentForm id={acceptedTopics[0].id} setDocument={setDocument} />
            )}
            <Button
              className="w-full"
              radius="sm"
              color="danger"
              variant="flat"
            >
              Abandonar tema
            </Button>
            <EditAcceptedTopic classButton="w-full" topicData={{
              id: acceptedTopics[0].id,
              title: acceptedTopics[0].title,
              description: acceptedTopics[0].description,
              graduationOption: acceptedTopics[0].graduationOption,
            } as TopicResponse }  />
          </div>
        </div>
      }
      subtitleLeft="Presiona para ver comentarios o agregar nueva versión"
      titleLeft="Comentarios"
    >
      {loading ? (
        <Spinner />
      ) : document.length > 0 ? (
        <>
          <div className="fixed top-3 right-3 z-100">
            <Chip
              size="sm"
              color="primary"
              variant="flat"
              radius="sm"
            >{`Últ. actualización ${formatDate(document[0].updatedAt)}`}</Chip>
          </div>
          <DocumentViewer pdfFilePath={document[0].url} />
        </>
      ) : (
        <p> No hay documento </p>
      )}
    </DoublePanelLayout>
  );
};
