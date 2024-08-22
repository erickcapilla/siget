import type { AdvisoryResponse } from "@/types/advisory";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { useAuth, useUser } from "@/hooks";
import advisoryServices from "@/services/AdvisoryServices";
import { AdviceList, Panel } from "@/components/features";

export const AdviceSection = () => {
  const [loading, setLoading] = useState(false);
  const [advices, setAdvices] = useState<AdvisoryResponse[]>([]);
  const { token } = useAuth();
  const { acceptedTopics } = useUser();

  useEffect(() => {
    setLoading(true);
    advisoryServices
      .getAdvisories(token, acceptedTopics[0].id)
      .then((res) => res.json())
      .then((data) => {
        setAdvices(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Panel title="Asesorías" className="@container size-full">
      <div className="size-full">
        {loading && (
          <div className="size-full flex items-center justify-center">
            <Spinner />
          </div>
        )}
        <div className=" size-full">
          {!loading && advices.length > 0 && (
            <AdviceList advisories={advices} setAdvisories={setAdvices} />
          )}
        </div>
      </div>
    </Panel>
  );
};
