import { useEffect, useState } from "react";
import topicServices from "@/services/TopicServices";
import { AcceptedTopic } from "@/types/topic";
import { useAuth } from "@/hooks";
import { AllTopicsTable, Panel } from "@/components/features";
import { Spinner } from "@nextui-org/react";
import { LayoutMain } from "@/layouts";

export const AcceptedTopics = () => {
  const [topics, setTopics] = useState<AcceptedTopic[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
    setLoading(true);
    const degree = user.userDegreePrograms.map((degree) => degree.id);

    topicServices
      .getAllAcceptedTopics(token, degree)
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <LayoutMain>
      <Panel title="Temas aceptados">
        {loading ? (
          <Spinner />
        ) : topics.length > 0 ? (
          <AllTopicsTable topics={topics} />
        ) : (
          <p>No hay estudiantes</p>
        )}
      </Panel>
    </LayoutMain>
  );
};
