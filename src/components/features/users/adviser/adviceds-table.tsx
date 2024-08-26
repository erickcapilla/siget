import { useAuth } from "@/hooks";
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

export const AdvicedsTable = () => {
  const { acceptedTopics, user } = useAuth();

  return (
    <Table
      aria-label="Adviceds table for advisers"
      className="table-fixed"
      shadow="none"
    >
      <TableHeader>
        <TableColumn>Tema</TableColumn>
        <TableColumn>Descripción</TableColumn>
        <TableColumn>Estudiante(s)</TableColumn>
        <TableColumn>Acciones</TableColumn>
      </TableHeader>
      <TableBody>
        {acceptedTopics.map((topic) => (
          <TableRow key={topic.id}>
            <TableCell className="px-2 py-2">{topic.title}</TableCell>
            <TableCell className="px-2 py-2">{topic.description}</TableCell>
            <TableCell className="px-2 py-2">
              <Chip
                size="sm"
                variant="flat"
                avatar={<Avatar />}
              >{`${
                acceptedTopics[0].acceptedBy.id !== user.user.id
                  ? `${acceptedTopics[0].acceptedBy.name} ${acceptedTopics[0].acceptedBy.fatherLastName}`
                  : `${acceptedTopics[0].requestedBy.name} ${acceptedTopics[0].requestedBy.fatherLastName}`
              }`}</Chip>
              {topic.collaborator && (
                <Chip
                  size="sm"
                  variant="flat"
                  avatar={<Avatar />}
                  color="secondary"
                >{`${topic.collaborator.name} ${topic.collaborator.fatherLastName}`}</Chip>
              )}
            </TableCell>
            <TableCell className="px-2 py-2 flex gap-3">
              <Button
                as={Link}
                size="sm"
                startContent={<DocumentOutline />}
                href={`/document/${topic.acceptedBy.id}`}
                variant="flat"
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
                variant="flat"
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
