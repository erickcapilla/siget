import { useEffect } from "react";
import { TopicResponse } from "@/types/topic";
import topicServices from "@/services/TopicServices";
import { useAuth } from "@/hooks/useAuth";
import { TopicsList } from "@/components/features";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserTopics: React.Dispatch<React.SetStateAction<TopicResponse[]>>;
  userTopics: TopicResponse[];
}

export const UserTopics = ({ setIsLoading, setUserTopics, userTopics }: Props) => {
  const { token } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    topicServices
      .getUserTopics(token)
      .then((response) => response.json())
      .then((data) => setUserTopics(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [])

  return (
    <div className="grid gap-3">
      {userTopics.length > 0 ? (
        <TopicsList topics={userTopics} isUser setUserTopics={setUserTopics} />
      ) : (
        <p>No tienes temas publicados</p>
      )}
    </div>
  )
}