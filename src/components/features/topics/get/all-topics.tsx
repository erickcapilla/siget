import type { AcceptedTopic } from "@/types/topic";
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
import { DocumentOutline, PaperCheckOutline } from "@/components/icons";
import { optionNames } from "@/utils/utils";
import { ROLES } from "@/utils";

interface Props {
  topics: AcceptedTopic[];
}

export const AllTopicsTable = ({ topics }: Props) => {
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
        {topics.map((topic) => (
          <TableRow key={topic.id}>
            <TableCell className="px-2 py-2">{topic.title}</TableCell>
            <TableCell className="px-2 py-2">{topic.description}</TableCell>
            <TableCell className="px-2 py-2">
              <Chip
                size="sm"
                variant="flat"
                color="secondary"
                avatar={<Avatar color="secondary" />}
              >
                {topic.proposedByRole === ROLES.ADVISOR
                  ? `${topic.acceptedBy.name} ${topic.acceptedBy.fatherLastName}`
                  : `${topic.requestedBy.name} ${topic.requestedBy.fatherLastName}`}
              </Chip>
            </TableCell>
            <TableCell className="px-2 py-2">
              <Chip size="sm" variant="flat" avatar={<Avatar />}>
                {topic.proposedByRole === ROLES.STUDENT
                  ? `${topic.acceptedBy.name} ${topic.acceptedBy.fatherLastName}`
                  : `${topic.requestedBy.name} ${topic.requestedBy.fatherLastName}`}
              </Chip>
              {topic.collaborator && (
                <Chip
                  size="sm"
                  variant="flat"
                  avatar={<Avatar />}
                  color="secondary"
                >{`${topic.collaborator.name} ${topic.collaborator.fatherLastName}`}</Chip>
              )}
            </TableCell>
            <TableCell className="px-2 py-2">
              <Chip size="sm" variant="flat" color="success" radius="sm">
                {optionNames[topic.graduationOption.name]}
              </Chip>
            </TableCell>
            <TableCell className="px-2 py-2 flex gap-3">
              <Button
                as={Link}
                size="sm"
                startContent={<DocumentOutline />}
                href={`/view-document/${topic.id}`}
                variant="light"
                color="primary"
                radius="sm"
              >
                Documento
              </Button>
              <Button
                as={Link}
                size="sm"
                startContent={<PaperCheckOutline />}
                href={`/advice/${topic.id}`}
                variant="light"
                color="secondary"
                radius="sm"
              >
                Asesorias
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
