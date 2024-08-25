import { useUser, useAuth } from "@/hooks";
import { Chip, Avatar, Link } from "@nextui-org/react";
import { DocumentOutline, PaperCheckOutline } from "@/components/icons";

export const AdvicedsTable = () => {
  const { acceptedTopics } = useUser();
  const { userAuthed } = useAuth();

  return (
    <>
      <table className="w-full text-sm border-collapse table-fixed text-stone-900">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-2 py-2 border border-slate-300">Tema</th>
            <th className="px-2 py-2 border border-slate-300">Estudiante(s)</th>
            <th className="px-2 py-2 border border-slate-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {acceptedTopics.map((topic) => (
            <tr key={topic.id}>
              <td className="px-2 py-2">{topic.title}</td>
              <td className="px-2 py-2">
                <Chip size="sm" variant="flat" avatar={<Avatar color="secondary" />} color="secondary">{`${
                  acceptedTopics[0].acceptedBy.id !== userAuthed
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
              </td>
              <td className="px-2 py-2 flex gap-3">
                <Link
                  href={`/topic/${topic.id}`}
                  showAnchorIcon
                  anchorIcon={<DocumentOutline size={3} />}
                  size="sm"
                >
                  Documento
                </Link>
                <Link
                  href={`/advice/${topic.id}`}
                  showAnchorIcon
                  anchorIcon={<PaperCheckOutline size={3} />}
                  size="sm"
                  color="secondary"
                >
                  Asesorías
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
