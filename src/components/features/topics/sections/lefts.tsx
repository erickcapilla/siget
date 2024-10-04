import { useEffect, useState } from "react";
import { AcceptedTopic } from "@/types/topic";
import topicServices from "@/services/TopicServices";
import { useAuth } from "@/hooks/useAuth";
import { LeftList } from "@/components/features";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LeftTopicsSection = ({ setIsLoading }: Props) => {
  const [topics, setTopics] = useState<AcceptedTopic[]>([]);
  const { token, user } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    const degree = user.userDegreePrograms.map((degree) => degree.id);

    topicServices
      .getLeftTopics(token, degree)
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [])

  return (
    <div className="grid gap-3">
      {topics.length > 0 ? (
        <LeftList topics={topics} />
      ) : (
        <p>No hay temas abandonados</p>
      )}
    </div>
  )
}