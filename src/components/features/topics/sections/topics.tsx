import { useEffect, useState } from "react";
import { TopicResponse } from "@/types/topic";
import topicServices from "@/services/TopicServices";
import { useAuth } from "@/hooks/useAuth";
import { TopicsList } from "@/components/features";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AllTopics = ({ setIsLoading }: Props) => {
  const [topics, setTopics] = useState<TopicResponse[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    topicServices
      .getTopics(token)
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [])

  return (
    <div className="grid gap-3">
      {topics.length > 0 ? (
        <TopicsList topics={topics} isUser={false} />
      ) : (
        <p>No hay temas disponibles</p>
      )}
    </div>
  )
}