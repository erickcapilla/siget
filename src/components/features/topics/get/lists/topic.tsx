import { TopicItem } from "../items/TopicItem";
import { TopicResponse } from "@/types/topic";

interface Props {
  topics: TopicResponse[];
  setUserTopics?: React.Dispatch<React.SetStateAction<TopicResponse[]>>;
  isUser: boolean;
}

export const TopicsList = ({ topics, isUser, setUserTopics }: Props) => {
  return (
    <>
      {topics.map((topic) => (
        <TopicItem key={topic.id} topic={topic} isUser={isUser} setUserTopics={setUserTopics} />
      ))}
    </>
  );
};
