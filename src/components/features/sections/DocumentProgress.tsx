import type { DocumentResponse } from "@/types/topic";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import documentServices from "@/services/DocumentServices";
import { ProgressDocumentBar } from "@/components/features";
import { Spinner, Chip, Avatar } from "@nextui-org/react";

export const DocumentProgressSection = () => {
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState<DocumentResponse[]>([]);
  const { token, user, acceptedTopics } = useAuth();

  useEffect(() => {
    setLoading(true);
    documentServices
      .getUserDocuments(token)
      .then((res) => res.json())
      .then((data) => {
        setDocument(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <div className="size-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : document.length > 0 ? (
        <div className="size-full flex flex-col justify-between">
          <div>
            <Chip size="sm" color="secondary" variant="dot">
              {acceptedTopics[0].title}
            </Chip>
          </div>
          <h3 className="mx-auto text-center text-xl font-semibold text-secondary mb-8">
            Capítulos completados
          </h3>
          <div className="size-full px-10 py-3 overflow-x-auto">
            {document.length > 0 ? (
              <div className="min-w-[600px]">
                <ProgressDocumentBar document={document} />
              </div>
            ) : (
              <p> No hay documentos </p>
            )}
          </div>
          <div className="w-full items-center justify-between pt-3">
            <Chip
              size="sm"
              avatar={<Avatar color="secondary" />}
              variant="flat"
              color="secondary"
            >
              {`${
                acceptedTopics[0].acceptedBy.id !== user?.user.id
                  ? `${acceptedTopics[0].acceptedBy.name} ${acceptedTopics[0].acceptedBy.fatherLastName}`
                  : `${acceptedTopics[0].requestedBy.name} ${acceptedTopics[0].requestedBy.fatherLastName}`
              } (Asesor)`}
            </Chip>
          </div>
        </div>
      ) : (
        <p> No tienes tema asignado </p>
      )}
    </>
  );
};
