import type { AdvisoryResponse } from "@/types/advisory";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { useAuth } from "@/hooks";
import advisoryServices from "@/services/AdvisoryServices";
import { AdviceList } from "@/components/features";

export const AdviceSection = () => {
  const [loading, setLoading] = useState(false);
  const [advices, setAdvices] = useState<AdvisoryResponse[]>([]);
  const { token, acceptedTopics } = useAuth();

  useEffect(() => {
    if (acceptedTopics.length > 0) {
      setLoading(true);
      advisoryServices
        .getAdvisories(token, acceptedTopics[0].id)
        .then((res) => res.json())
        .then((data) => {
          setAdvices(data);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="size-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : advices.length > 0 ? (
        <div className="@container size-full">
          <AdviceList advisories={advices} setAdvisories={setAdvices} />
        </div>
      ) : (
        <p> No hay asesorías </p>
      )}
    </>
  );
};
