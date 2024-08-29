import {
  Chip,
  Avatar,
  Link,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { DocumentOutline } from "@/components/icons";
import { optionNames } from "@/utils/utils";
import { ROLES } from "@/utils";
import { TopicReview } from "@/types/reviewer";

interface Props {
  reviews: TopicReview[];
}

export const ReviewerTopicsTable = ({ reviews }: Props) => {
  return (
    <Table
      aria-label="Adviceds table for advisers"
      shadow="none"
      isHeaderSticky
      isStriped
      classNames={{
        base: "size-full overflow-scroll",
      }}
    >
      <TableHeader>
        <TableColumn>Tema</TableColumn>
        <TableColumn>Descripción</TableColumn>
        <TableColumn>Asesor</TableColumn>
        <TableColumn>Estudiante(s)</TableColumn>
        <TableColumn>Tipo</TableColumn>
        <TableColumn>Acciones</TableColumn>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={review.topic.id}>
            <TableCell className="px-2 py-2">{review.topic.title}</TableCell>
            <TableCell className="px-2 py-2">{review.topic.description}</TableCell>
            <TableCell className="px-2 py-2">
              <Chip
                size="sm"
                variant="flat"
                color="secondary"
                avatar={<Avatar color="secondary" />}
              >
                {review.topic.proposedByRole === ROLES.ADVISOR
                  ? `${review.topic.acceptedBy.name} ${review.topic.acceptedBy.fatherLastName}`
                  : `${review.topic.requestedBy.name} ${review.topic.requestedBy.fatherLastName}`}
              </Chip>
            </TableCell>
            <TableCell className="px-2 py-2">
              <Chip size="sm" variant="flat" avatar={<Avatar />}>
                {review.topic.proposedByRole === ROLES.STUDENT
                  ? `${review.topic.acceptedBy.name} ${review.topic.acceptedBy.fatherLastName}`
                  : `${review.topic.requestedBy.name} ${review.topic.requestedBy.fatherLastName}`}
              </Chip>
              {review.topic.collaborator && (
                <Chip
                  size="sm"
                  variant="flat"
                  avatar={<Avatar />}
                  color="secondary"
                >{`${review.topic.collaborator.name} ${review.topic.collaborator.fatherLastName}`}</Chip>
              )}
            </TableCell>
            <TableCell className="px-2 py-2">
              <Chip size="sm" variant="flat" color="success" radius="sm">
                {optionNames[review.topic.graduationOpton.name]}
              </Chip>
            </TableCell>
            <TableCell className="px-2 py-2 flex gap-3">
              <Button
                as={Link}
                size="sm"
                startContent={<DocumentOutline />}
                href={`/view-document/${review.topic.id}`}
                variant="light"
                color="primary"
                radius="sm"
              >
                Documento
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
