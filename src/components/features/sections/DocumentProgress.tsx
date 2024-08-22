import type { DocumentResponse } from "@/types/topic";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@/hooks";
import documentServices from "@/services/DocumentServices";
import { ProgressDocumentBar, Panel } from "@/components/features";
import { Spinner, Chip, Avatar } from "@nextui-org/react";

export const DocumentProgressSection = () => {
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState<DocumentResponse[]>([]);
  const { token, userAuthed } = useAuth();
  const { acceptedTopics } = useUser();
  const asesor =
    acceptedTopics[0].acceptedBy &&
    acceptedTopics[0].acceptedBy?.id !== userAuthed
      ? acceptedTopics[0].acceptedBy
      : acceptedTopics[0].requestedBy;

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
    <Panel
      title={`${acceptedTopics[0].title} - Progreso`}
      className="size-full"
    >
      <div className="size-full flex flex-col justify-between">
        {loading && (
          <div className="size-full flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {!loading && (
          <div className="size-full px-10 overflow-x-auto">
            <h3 className="mx-auto text-center text-xl font-semibold text-secondary mb-10">
              Capítulos
            </h3>
            {document.length > 0 && <div className="min-w-[600px]"><ProgressDocumentBar document={document} /></div>}
          </div>
        )}
        <div className="w-full items-center justify-between pt-3">
          <Chip size="sm" avatar={<Avatar color="secondary" />} variant="flat" color="secondary">
            {" "}
            {`${asesor.name} ${asesor.fatherLastName} (Asesor)`}{" "}
          </Chip>
          {acceptedTopics[0].collaborator && (
            <Chip size="sm" avatar={<Avatar />} variant="flat">
              {" "}
              {`${acceptedTopics[0].collaborator?.name} ${acceptedTopics[0].collaborator?.fatherLastName} (Colaborador)`}{" "}
            </Chip>
          )}
        </div>
      </div>
    </Panel>
  );
};
