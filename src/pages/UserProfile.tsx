import { DoublePanelLayout } from "@/layouts";
import {
  PersonalForm,
  Details,
} from "@/components/features";

export const UserProfile = () => {
  return (
    <DoublePanelLayout
      contentLeft={<Details />}
      subtitleLeft="Presiona para ver tu información"
      title="Mi perfil"
      titleLeft="Información personal"
    >
      <PersonalForm />
    </DoublePanelLayout>
  );
};
