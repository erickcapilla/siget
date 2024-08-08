import { RequestItem } from "../items";
import { RequestTopic } from "@/types/topic";

interface Props {
  requests: RequestTopic[];
}

export const RequestsList = ({ requests }: Props) => {
  return (
    <>
      {requests.map((request) => (
        <RequestItem key={request.id} request={request} />
      ))}
    </>
  );
};
