import type { ReviewerResponse } from "@/types/reviewer";
import type { DocumentResponse } from "@/types/topic";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import documentServices from "@/services/DocumentServices";
import {
  ProgressDocumentBar,
  ReviewerItem,
  NotFoundLayout,
} from "@/components/features";
import { Spinner, Chip, Avatar } from "@nextui-org/react";
import { optionNames } from "@/utils/utils";
import reviewerService from "@/services/ReviewerServices";
import { AddDocument } from "@/components/unDraws";

export const DocumentProgressSection = () => {
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState<DocumentResponse[]>([]);
  const [reviewers, setReviewers] = useState<ReviewerResponse[]>([]);
  const { token, user, acceptedTopics } = useAuth();

  useEffect(() => {
    setLoading(true);
    documentServices
      .getStudentDocument(token, acceptedTopics[0]?.id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDocument([data]);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    reviewerService
      .getReviewerByTopic(token, acceptedTopics[0].id)
      .then((res) => res.json())
      .then((data) => setReviewers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {loading ? (
        <div className="size-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : document.length > 0 ? (
        <div className="size-full flex flex-col justify-between">
          <div className="w-full flex gap-2 justify-between">
            <Chip size="sm" color="secondary" variant="dot">
              {acceptedTopics[0].title}
            </Chip>
            <Chip size="sm" color="success" variant="dot">
              {optionNames[acceptedTopics[0].graduationOption.name]}
            </Chip>
          </div>
          <h3 className="mx-auto text-center text-lg font-semibold text-secondary mb-5 mt-2">
            Capítulos completados
          </h3>
          <div className="size-full px-10 py-3 overflow-x-auto">
            {document.length > 0 ? (
              <>
                <div className="min-w-[600px]">
                  <ProgressDocumentBar
                    document={document}
                    type={acceptedTopics[0].graduationOption.name}
                  />
                </div>
              </>
            ) : (
              <p> No hay documentos </p>
            )}
          </div>
          <div className="w-full flex items-center justify-between py-3 overflow-y-hidden overflow-x-auto">
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
            {acceptedTopics[0].collaborator && (
              <Chip
                size="sm"
                avatar={<Avatar color="secondary" />}
                variant="flat"
                color="secondary"
              >
                {`${acceptedTopics[0].collaborator.name} ${acceptedTopics[0].collaborator.fatherLastName} (Colaborador)`}
              </Chip>
            )}
            {reviewers.length > 0 ? (
              reviewers.map((reviewer) => (
                <ReviewerItem key={reviewer.id} reviewer={reviewer} />
              ))
            ) : (
              <p> Sin revisores aún </p>
            )}
          </div>
        </div>
      ) : (
        <NotFoundLayout
          title="Sin documento"
          description="Agrega tu documento"
        >
          <AddDocument />
        </NotFoundLayout>
      )}
    </>
  );
};
