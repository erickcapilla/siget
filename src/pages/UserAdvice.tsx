import { DoublePanelLayout } from "@/layouts";
import { AdviceForm, AdviceList } from "@/components/features";
import advisoryServices from "@/services/AdvisoryServices";
import { useAuth, useUser } from "@/hooks";
import { useEffect, useState } from "react";
import { AdvisoryResponse } from "@/types/advisory";

export const UserAdvice = () => {
  const { token } = useAuth();
  const { acceptedTopics } = useUser();
  const [advisories, setAdvisories] = useState<AdvisoryResponse[]>([]);

  useEffect(() => {
    advisoryServices
      .getAdvisories(token, acceptedTopics[0].id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAdvisories(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <DoublePanelLayout
      title="Asesorías"
      titleLeft="Agregar asesoría"
      subtitleLeft="Presiona para agregar una nueva asesoría"
      contentLeft={<AdviceForm setAdvisories={setAdvisories} id={acceptedTopics[0].id} />}
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
