import { DoublePanelLayout } from "@/layouts";
import {
  DocumentForm,
  DocumentViewer,
  CommentList,
  EditDocumentForm,
  ModalOptionsTopic,
} from "@/components/features";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import documentCommentsServices from "@/services/DocumentCommentsServices";
import documentServices from "@/services/DocumentServices";
import topicServices from "@/services/TopicServices";
import { CommentResponse, DocumentResponse } from "@/types/topic";
import { UserTopicResponse } from "@/types/user";
import { Spinner, Chip, Button } from "@nextui-org/react";
import { formatDate } from "@/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { paths } from "@/utils";

export const UserDocument = () => {
  const { token, acceptedTopics, setAcceptedTopics } = useAuth();
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [document, setDocument] = useState<DocumentResponse[]>([]);
  const [users, setUsers] = useState<UserTopicResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [finishLoading, setFinishLoading] = useState(false);
  const navigate = useNavigate();

  const getCommentsByUser = (userID: string) => {
    documentCommentsServices
      .getCommentsByUser(token, document[0]?.id, userID)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.result);
      })
      .catch((error) => console.error(error));
  };

  const getUsersThatComment = (documentID: string) => {
    documentCommentsServices
      .getUsersThatComment(token, documentID)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);

        if (data.length > 0) {
          getCommentsByUser(data[0].id);
        }
      })
      .catch((error) => console.error(error));
  };

  const finalizeDocument = () => {
    setFinishLoading(true);

    topicServices
      .finishAcceptedTopic(token, acceptedTopics[0].id)
      .then(() => setAcceptedTopics([]))
      .then(() => {
        toast.success("Documento finalizado");
        navigate(paths.home);
      })
      .catch((error) => console.error(error))
      .finally(() => setFinishLoading(false));
  };

  useEffect(() => {
    documentServices
      .getUserDocuments(token)
      .then((res) => res.json())
      .then((data) => {
        setDocument(data);

        if (data.length > 0) {
          getUsersThatComment(data[0].id);
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
          <div className="mb-2 flex items-center">
            <div className="w-full flex gap-2 overflow-auto pb-2">
              {users.map((user) => (
                <Chip
                  key={user.id}
                  className="cursor-pointer"
                  onClick={() => {getCommentsByUser(user.id)}}
                  color="primary"
                  size="sm"
                  variant="flat"
                >
                  {user.name + " " + user.fatherLastName}
                </Chip>
              ))}
            </div>
            <ModalOptionsTopic />
          </div>
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
              <EditDocumentForm
                id={document[0]?.id}
                setDocument={setDocument}
                setLoading={setLoading}
              />
            ) : (
              <DocumentForm
                id={acceptedTopics[0].id}
                setDocument={setDocument}
                setLoading={setLoading}
              />
            )}
            {document[0]?.chapters === 100 && (
              <Button
                className="w-full"
                radius="sm"
                color="success"
                isLoading={finishLoading}
                variant="flat"
                onPress={() => {
                  toast((t) => (
                    <span>
                      ¿Estás seguro de Finalizar el Documento?
                      <Button
                        className="m-2"
                        color="success"
                        size="sm"
                        variant="flat"
                        onPress={() => {
                          finalizeDocument();
                          toast.dismiss(t.id);
                        }}
                      >
                        Finalizar
                      </Button>
                      <Button
                        className="m-2"
                        size="sm"
                        variant="flat"
                        onPress={() => {
                          toast.dismiss(t.id);
                        }}
                      >
                        Cancelar
                      </Button>
                    </span>
                  ));
                }}
              >
                Finalizar documento
              </Button>
            )}
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
