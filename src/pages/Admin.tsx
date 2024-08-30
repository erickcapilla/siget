import { DoublePanelLayout } from "@/layouts/DoublePanelLayout";
import { AdminForms, AdminSection } from "@/components/features";
import { useState } from "react";
import { DegreeResponse, GraduationResponse } from "@/types/admin";

export const Admin = () => {
  const [graduations, setGraduations] = useState<GraduationResponse[]>([]);
  const [degrees, setDegrees] = useState<DegreeResponse[]>([]);

  return (
    <DoublePanelLayout
      titleLeft="Agregar"
      subtitleLeft="Presiona para agregar un programa educativo o una opción de titulación"
      title="Administrar"
      contentLeft={<AdminForms setDegrees={setDegrees} setGraduations={setGraduations} />}
    >
      <AdminSection
        setDegrees={setDegrees}
        degrees={degrees}
        setGraduations={setGraduations}
        graduations={graduations}
      />
    </DoublePanelLayout>
  );
};
