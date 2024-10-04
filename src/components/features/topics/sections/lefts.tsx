import { useEffect, useState } from "react";
import { AcceptedTopic } from "@/types/topic";
import topicServices from "@/services/TopicServices";
import { useAuth } from "@/hooks/useAuth";
import { LeftList } from "@/components/features";
import { ROLES } from "@/utils";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LeftTopicsSection = ({ setIsLoading }: Props) => {
  const [topics, setTopics] = useState<AcceptedTopic[]>([]);
  const { token, user, role } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    const degree = user.userDegreePrograms.map((degree) => degree.id);

    if(role === ROLES.STUDENT) {
      topicServices
      .getLeftTopics(token, degree)
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
    }

    if(role === ROLES.ADVISOR) {
      topicServices
      .getLeftTopicAsesor(token)
      .then((response) => response.json())
      .then((data) => {
        setTopics(data);
        console.log(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
    }
    
  }, [])

  return (
    <div className="grid gap-3">
      {topics.length > 0 ? (
        <LeftList topics={topics} setTopics={setTopics} />
      ) : (
        <p>No hay temas abandonados</p>
      )}
    </div>
  )
}