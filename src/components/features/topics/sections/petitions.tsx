import { useEffect, useState } from "react";
import { PetitionTopic } from "@/types/topic";
import requestServices from "@/services/RequestTopicServices";
import { useAuth } from "@/hooks/useAuth";
import { PetitionsList } from "@/components/features";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserPetitions = ({ setIsLoading }: Props) => {
  const [petitions, setPetitions] = useState<PetitionTopic[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    requestServices
      .getUserPetitions(token)
      .then((response) => response.json())
      .then((data) => setPetitions(data))
      .then(() => console.log(petitions))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [])

  return (
    <div className="grid gap-3">
      {petitions.length > 0 ? (
        <PetitionsList petitions={petitions} />
      ) : (
        <p>No hay temas</p>
      )}
    </div>
  )
}