import type { DegreeResponse } from "@/types/admin";
import { useEffect, useState } from "react";
import topicServices from "@/services/TopicServices";
import { AcceptedTopic } from "@/types/topic";
import { useAuth } from "@/hooks";
import { AllTopicsTable, Panel } from "@/components/features";
import { Spinner, Chip } from "@nextui-org/react";
import { LayoutMain } from "@/layouts";
import degreeServices from "@/services/DegreeServices";

export const FinishedTopics = () => {
  const [topics, setTopics] = useState<AcceptedTopic[]>([]);
  const [degrees, setDegrees] = useState<DegreeResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const getFinishedTopics = (degree: string) => {
    setLoading(true);

    topicServices
      .getFinishedTopics(token, [degree])
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);

    degreeServices
      .getDegrees(token)
      .then((response) => response.json())
      .then((data) => {
        setDegrees(data);

        if (data.length > 0) {
          getFinishedTopics(data[0].id);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <LayoutMain>
      <Panel title="Temas finalizados">
        <div className="flex gap-2 overflow-auto pb-2">
          {degrees.map((degree) => (
            <Chip
              key={degree.id}
              className="cursor-pointer"
              onClick={() => getFinishedTopics(degree.id)}
              color="primary"
              size="sm"
              variant="flat"
            >
              {degree.name.charAt(0).toUpperCase() +
                degree.name.slice(1).replace(/-/g, " ")}
            </Chip>
          ))}
        </div>
        {loading ? (
          <Spinner />
        ) : topics.length > 0 ? (
          <AllTopicsTable topics={topics} />
        ) : (
          <p>No hay temas finalizados</p>
        )}
      </Panel>
    </LayoutMain>
  );
};
