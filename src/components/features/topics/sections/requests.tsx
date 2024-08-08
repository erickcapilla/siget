import { useEffect, useState } from "react";
import { RequestTopic } from "@/types/topic";
import requestServices from "@/services/RequestTopicServices";
import { useAuth } from "@/hooks/useAuth";
import { RequestsList } from "@/components/features";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserRequests = ({ setIsLoading }: Props) => {
  const [requests, setRequests] = useState<RequestTopic[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    requestServices
      .getUserRequests(token)
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .then(() => console.log(requests))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [])

  return (
    <div className="grid gap-3">
      {requests.length > 0 ? (
        <RequestsList requests={requests} />
      ) : (
        <p>No hay temas</p>
      )}
    </div>
  )
}