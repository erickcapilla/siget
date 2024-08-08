import { DoublePanelLayout } from "@/layouts/DoublePanelLayout";
import { AdminForms, AdminSection } from "@/components/features"

export const Admin = () => {
  return (
    <DoublePanelLayout
      titleLeft="Agregar"
      subtitleLeft="Presiona para agregar un programa educativo o una opción de titulación"
      title="Administrar"
      contentLeft={<AdminForms />}
    >
      <AdminSection />
    </DoublePanelLayout>
  );
};
