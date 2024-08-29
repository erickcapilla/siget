import { DoublePanelLayout } from "@/layouts";
import { AdviceForm, AdviceList } from "@/components/features";
import advisoryServices from "@/services/AdvisoryServices";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdvisoryResponse } from "@/types/advisory";
import { ROLES } from "@/utils";

export const Advice = () => {
  const { token, role } = useAuth();
  const { id } = useParams();
  const [advisories, setAdvisories] = useState<AdvisoryResponse[]>([]);

  useEffect(() => {
    advisoryServices
      .getAdvisories(token, id)
      .then((res) => res.json())
      .then((advisories) => setAdvisories(advisories))
      .catch((error) => console.error(error));
  }, []);

  return (
    <DoublePanelLayout
      title="Asesorías"
      titleLeft="Agregar asesoría"
      subtitleLeft="Presiona para Agregar una asesoría"
      contentLeft={
        role !== ROLES.SUBJECT_HOLDER && (
          <AdviceForm id={id} setAdvisories={setAdvisories} />
        )
      }
    >
      <>
        {advisories.length > 0 ? (
          <AdviceList advisories={advisories} setAdvisories={setAdvisories} />
        ) : (
          <p>No hay asesorías</p>
        )}
      </>
    </DoublePanelLayout>
  );
};
