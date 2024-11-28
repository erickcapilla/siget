import type { DocumentResponse, CommentResponse } from "@/types/topic";
import { DoublePanelLayout } from "@/layouts";
import { Button, Chip, Spinner } from "@nextui-org/react";
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
import { ROLES, formatDate } from "@/utils";
import { chapters } from "@/data/chapters";
import toast from "react-hot-toast";

export const Document = () => {
  const { token, role, acceptedTopics } = useAuth();
  const { id } = useParams();
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [document, setDocument] = useState<DocumentResponse>();
  const [loading, setLoading] = useState(false);
  const topic = acceptedTopics.filter((topic) => topic.id === id);

  const getDocument = () => {
    documentServices
      .getStudentDocument(token, id)
      .then((res) => res.json())
      .then((data) => {
        setDocument(data);
        getComments(data.id);
      })
      .catch((error) => console.error(error));
  };

  const approveDocument = () => {
    documentServices
      .updateChapter(token, 100, document.id)
      .then(() =>
        toast.success("Documento aprobado")
      )
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
        getDocument();
      });
  };

  const updateChapter = () => {
    setLoading(true);

    const chapter =
      chapters[topic[0].graduationOption.name].reverse[document?.chapters];
    const newChapter =
      chapters[topic[0].graduationOption.name].percent[chapter + 1];

    documentServices
      .updateChapter(token, parseInt(newChapter), document.id)
      .then(() =>
        toast.success(
          `Capítulo ${
            chapters[topic[0].graduationOption.name].reverse[
              document?.chapters
            ] + 1
          } aprobado`
        )
      )
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
        getDocument();
      });
  };

  const backChapter = () => {
    setLoading(true);

    const chapter =
      chapters[topic[0].graduationOption.name].reverse[document?.chapters];
    const newChapter =
      chapters[topic[0].graduationOption.name].percent[chapter - 1];

    documentServices
      .updateChapter(token, parseInt(newChapter), document.id)
      .then(() => toast.success("Capítulo regresado"))
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
        getDocument();
      });
  };

  const getComments = (DocumentID: string) => {
    documentCommentsServices
      .getComments(token, DocumentID)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getDocument();
  }, []);

  return (
    <DoublePanelLayout
      title="Documento"
      contentLeft={
        <div className="size-full flex gap-3 flex-col justify-between">
          {comments.length > 0 ? (
            <div className="size-full flex flex-col gap-2 overflow-y-auto pr-2">
              <CommentList comments={comments} setComments={setComments} />
            </div>
          ) : (
            <p>No hay comentarios</p>
          )}
          <div className="w-full grid gap-2">
            {(role === ROLES.ADVISOR || role === ROLES.REVIEWER) && (
              <CommentForm id={document?.id} setComments={setComments} />
            )}
            {!loading && role === ROLES.ADVISOR ? (
              <div className="max-w-full flex gap-2">
                {document?.chapters > 0 && (
                  <Button
                    className="w-full"
                    radius="sm"
                    color="danger"
                    variant="flat"
                    onPress={() => {
                      toast((t) => (
                        <span>
                          ¿Estás seguro de regresar el capítulo?
                          <Button
                            className="m-2"
                            color="danger"
                            size="sm"
                            variant="flat"
                            onPress={() => {
                              backChapter();
                              toast.dismiss(t.id);
                            }}
                          >
                            Regresar
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
                    Regresar
                  </Button>
                )}
                {document?.chapters === 99 && (
                  <Button
                    className="w-full"
                    radius="sm"
                    color="success"
                    variant="flat"
                    onPress={() => {
                      toast((t) => (
                        <span>
                          ¿Estás seguro de APROBAR este documento?
                          <Button
                            className="m-2"
                            color="success"
                            size="sm"
                            variant="flat"
                            onPress={() => {
                              approveDocument();
                              toast.dismiss(t.id);
                            }}
                          >
                            Aprobar
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
                    Aprobar documento
                  </Button>
                )}
                {document?.chapters < 99 && (
                  <Button
                    className="w-full"
                    radius="sm"
                    color="success"
                    variant="flat"
                    onPress={() => {
                      toast((t) => (
                        <span>
                          ¿Estás seguro de aprobar el capítulo?
                          <Button
                            className="m-2"
                            color="success"
                            size="sm"
                            variant="flat"
                            onPress={() => {
                              updateChapter();
                              toast.dismiss(t.id);
                            }}
                          >
                            Aprobar
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
                    Aprobar capítulo{" "}
                    {chapters[topic[0].graduationOption.name].reverse[
                      document?.chapters
                    ] + 1}
                  </Button>
                )}
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      }
      subtitleLeft="Presiona para ver comentarios o agregar nueva versión"
      titleLeft="Comentarios"
    >
      {document ? (
        <>
          <div className="fixed top-3 right-3 z-100">
            <Chip
              size="sm"
              color="primary"
              variant="flat"
              radius="sm"
            >{`Últ. actualización ${formatDate(document.updatedAt)}`}</Chip>
          </div>
          <DocumentViewer pdfFilePath={document.url} />
        </>
      ) : (
        <p> No hay documento </p>
      )}
    </DoublePanelLayout>
  );
};
