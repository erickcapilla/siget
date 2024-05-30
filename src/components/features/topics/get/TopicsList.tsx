import { TopicItem } from "./TopicItem";
import { useTopic } from "@/hooks/useTopic";

interface Props {
  view: string;
}

export const TopicsList = ({ view }: Props) => {
  const { topics, userTopics } = useTopic();
  console.log("All topics", topics)
  console.log("User topics", userTopics)
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
    </div>
  );
};
