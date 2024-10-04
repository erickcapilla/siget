import { LeftItem } from "../items";
import { AcceptedTopic } from "@/types/topic";

interface Props {
  topics: AcceptedTopic[];
  setTopics: React.Dispatch<React.SetStateAction<AcceptedTopic[]>>;
}

export const LeftList = ({ topics, setTopics }: Props) => {
  return (
    <>
      {topics.map((topic) => (
        <LeftItem key={topic.id} topic={topic} setTopics={setTopics} />
      ))}
    </>
  );
};
