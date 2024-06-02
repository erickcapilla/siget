import { TopicItem } from "./TopicItem";
import { RequestItem } from "./RequestItem";
import { PetitionItem } from "./PetitionItem";
import { useTopic } from "@/hooks/useTopic";

interface Props {
  view: string;
}

export const TopicsList = ({ view }: Props) => {
  const { topics, userTopics, userRequests, userPetitions } = useTopic();
  return (
    <div className="grid gap-2">
      {view === "all" &&
        topics.map((topic) => (
          <TopicItem key={topic.id} topic={topic} view={view} />
        ))}

      {view === "user" &&
        userTopics.map((topic) => (
          <TopicItem key={topic.id} topic={topic} view={view} />
        ))}

      {view === "interest" &&
        userRequests.map((request) => (
          <RequestItem key={request.id} request={request} />
        ))}

      {view === "proposals" &&
        userPetitions.length > 0 &&
        userPetitions.map((petition) => (
          <PetitionItem key={petition.id} petition={petition} />
        ))}
    </div>
  );
};
