import { PetitionItem } from "../items";
import { PetitionTopic } from "@/types/topic";

interface Props {
  petitions: PetitionTopic[];
}

export const PetitionsList = ({ petitions }: Props) => {
  return (
    <>
      {petitions.map((petition) => (
        <PetitionItem key={petition.id} petition={petition} />
      ))}
    </>
  );
};
