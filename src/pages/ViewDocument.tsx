import type { DocumentResponse } from "@/types/topic";
import { DoublePanelLayout } from "@/layouts";
import { Chip, Avatar, Divider } from "@nextui-org/react";
import { DocumentViewer, ModalReviwer } from "@/components/features";
import { useAuth } from "@/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import documentServices from "@/services/DocumentServices";
import topicServices from "@/services/TopicServices";
import { ROLES, formatDate } from "@/utils";
import { AcceptedTopic } from "@/types/topic";
import reviewerService from "@/services/ReviewerServices";
import { ReviewerResponse } from "@/types/reviewer";

export const ViewDocument = () => {
  const { token, role } = useAuth();
  const { id } = useParams();
  const [document, setDocument] = useState<DocumentResponse>();
  const [acceptedTopic, setAcceptedTopic] = useState<AcceptedTopic>();
  const [reviewers, setReviewers] = useState<ReviewerResponse[]>([]);

  useEffect(() => {
    topicServices
      .getAcceptedTopic(token, id)
      .then((res) => res.json())
      .then((data) => {
        setAcceptedTopic(data);
      })
      .catch((error) => console.error(error));

    documentServices
      .getStudentDocument(token, id)
      .then((res) => res.json())
      .then((data) => {
        setDocument(data);
      })
      .catch((error) => console.error(error));

    reviewerService
      .getReviewerByTopic(token, id)
      .then((res) => res.json())
      .then((data) => setReviewers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <DoublePanelLayout
      title="Documento"
      contentLeft={
        <div className="size-full flex gap-3 flex-col justify-between">
          {acceptedTopic ? (
            <>
              <div className="w-full flex flex-col gap-3 overflow-y-auto pr-2">
                <h2 className="text-primary w-full text-center font-semibold">
                  {" "}
                  {acceptedTopic.title}{" "}
                </h2>
                <p className="text-sm"> {acceptedTopic.description} </p>
                <Divider />
                <div>
                  <h3 className="text-xs text-gray-500 mb-2">Asesor</h3>
                  <Chip
                    size="sm"
                    variant="flat"
                    color="secondary"
                    avatar={<Avatar color="secondary" />}
                  >
                    {acceptedTopic.proposedByRole === ROLES.ADVISOR
                      ? `${acceptedTopic.acceptedBy.name} ${acceptedTopic.acceptedBy.fatherLastName}`
                      : `${acceptedTopic.requestedBy.name} ${acceptedTopic.requestedBy.fatherLastName}`}
                  </Chip>
                </div>
                <div>
                  <h3 className="text-xs text-gray-500 mb-2">Estudiante(s)</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Chip size="sm" variant="flat" avatar={<Avatar />}>
                      {acceptedTopic.proposedByRole === ROLES.STUDENT
                        ? `${acceptedTopic.acceptedBy.name} ${acceptedTopic.acceptedBy.fatherLastName}`
                        : `${acceptedTopic.requestedBy.name} ${acceptedTopic.requestedBy.fatherLastName}`}
                    </Chip>
                    {acceptedTopic.collaborator && (
                      <Chip
                        size="sm"
                        variant="flat"
                        avatar={<Avatar />}
                      >{`${acceptedTopic.collaborator.name} ${acceptedTopic.collaborator.fatherLastName}`}</Chip>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs text-gray-500 mb-2">Revisores</h3>
                  <div className="flex gap-2 flex-wrap">
                    {reviewers.length > 0 ? (
                      reviewers.map((reviewer) => (
                        <Chip
                          key={reviewer.id}
                          size="sm"
                          variant="flat"
                          color="success"
                          avatar={<Avatar color="success" />}
                        >{`${reviewer.reviewerId.name} ${reviewer.reviewerId.fatherLastName}`}</Chip>
                      ))
                    ) : (
                      <p>No hay revisores</p>
                    )}
                  </div>
                </div>
              </div>

              {role === ROLES.SUBJECT_HOLDER && (
                <ModalReviwer
                  topicId={id}
                  reviewers={reviewers}
                  setReviewers={setReviewers}
                />
              )}
            </>
          ) : (
            <p>No exite este tema</p>
          )}
        </div>
      }
      subtitleLeft="Presiona para ver más detalles"
      titleLeft="Detalles"
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
