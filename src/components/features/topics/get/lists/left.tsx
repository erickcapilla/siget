import { LeftItem } from "../items";
import { AcceptedTopic } from "@/types/topic";

interface Props {
  topics: AcceptedTopic[];
}

export const LeftList = ({ topics }: Props) => {
  return (
    <>
      {topics.map((topic) => (
        <LeftItem key={topic.id} topic={topic} />
      ))}
    </>
  );
};
