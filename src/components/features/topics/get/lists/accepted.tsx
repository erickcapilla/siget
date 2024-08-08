import { AcceptedItem } from "../items";
import { AcceptedTopic } from "@/types/topic";

interface Props {
  accepteds: AcceptedTopic[];
}

export const AcceptedList = ({ accepteds }: Props) => {
  return (
    <>
      {accepteds.map((accepted) => (
        <AcceptedItem key={accepted.id} accepted={accepted} />
      ))}
    </>
  );
};
