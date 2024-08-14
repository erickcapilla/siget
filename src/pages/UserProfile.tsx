import { DoublePanelLayout } from "@/layouts";
import {
  PersonalForm,
  Details,
} from "@/components/features";
import { useAuth } from "@/hooks";

export const UserProfile = () => {
  const { userAuthed } = useAuth();
  return (
    <DoublePanelLayout
      contentLeft={<Details id={userAuthed} />}
      subtitleLeft="Presiona para ver tu información"
      title="Mi perfil"
      titleLeft="Información personal"
    >
      <PersonalForm />
    </DoublePanelLayout>
  );
};
