import { useEffect, useState } from "react";
import { RequestTopic, AcceptedTopic } from "@/types/topic";
import requestServices from "@/services/RequestTopicServices";
import { useAuth } from "@/hooks/useAuth";
import { RequestsList, AcceptedList } from "@/components/features";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserRequests = ({ setIsLoading }: Props) => {
  const [requests, setRequests] = useState<RequestTopic[]>([]);
  const [accepteds, setAccepteds] = useState<AcceptedTopic[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    const getRequests = async () => {
      try {
        const response = await requestServices.getUserRequests(token);
        const data = await response.json();
        setRequests(data);

        const res = await requestServices.getAcceptedTopics(token);
        const acceptedData = await res.json();
        setAccepteds(acceptedData.items);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getRequests();
  }, []);

  return (
    <div className="grid gap-3">
      {requests.length > 0 && <RequestsList requests={requests} />}
      {accepteds.length > 0 && <AcceptedList accepteds={accepteds} />}
      {requests.length || (accepteds.length === 0 && <p>No hay solicitudes enviadas</p>)}
    </div>
  );
};
