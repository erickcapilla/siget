import { useEffect, useState } from "react";
import topicServices from "@/services/TopicServices";
import { AcceptedTopic } from "@/types/topic";
import { useAuth } from "@/hooks";
import { AllTopicsTable } from "@/components/features";
import { Spinner } from "@nextui-org/react";

export const AllAcceptedTopicsSection = () => {
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
    <div className="size-full">
      {loading ? (
        <Spinner />
      ) : topics.length > 0 ? (
        <AllTopicsTable topics={topics} />
      ) : (
        <p>No hay temas</p>
      )}
    </div>
  );
};
