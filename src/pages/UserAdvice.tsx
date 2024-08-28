import { DoublePanelLayout } from "@/layouts";
import { AdviceForm, AdviceList } from "@/components/features";
import advisoryServices from "@/services/AdvisoryServices";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { AdvisoryResponse } from "@/types/advisory";
import { Spinner } from "@nextui-org/react";

export const UserAdvice = () => {
  const { token, acceptedTopics } = useAuth();
  const [advisories, setAdvisories] = useState<AdvisoryResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (acceptedTopics.length > 0) {
      setLoading(true);
      advisoryServices
        .getAdvisories(token, acceptedTopics[0].id)
        .then((res) => res.json())
        .then((data) => {
          setAdvisories(data);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <DoublePanelLayout
      title="Asesorías"
      titleLeft="Agregar asesoría"
      subtitleLeft="Presiona para agregar una nueva asesoría"
      contentLeft={
        <AdviceForm setAdvisories={setAdvisories} id={acceptedTopics[0]?.id} />
      }
    >
      <>
        {loading ? (
          <Spinner />
        ) : advisories.length > 0 ? (
          <AdviceList advisories={advisories} setAdvisories={setAdvisories} />
        ) : (
          <p>No hay asesorías</p>
        )}
      </>
    </DoublePanelLayout>
  );
};
