import { LayoutItem } from "@/components/layouts";
import { PetitionTopic } from "@/types";
import { Chip, Button } from "@nextui-org/react";
import requestTopicServices from "@/services/RequestTopicServices";
import { useAuth } from "@/hooks"; 

interface Props {
  petition: PetitionTopic;
}

export const PetitionItem = ({ petition }: Props) => {
  const { token } = useAuth();

  const acceptPetition = () => {
    requestTopicServices.acceptPetition(token, petition.id)
      .then(res => res.json())
      .then(data => console.log(data))
      .then(() => console.log("aceptado"))
      .catch((e) => console.error(e))
  }

  const rejectPetition = () => {
    requestTopicServices.deletePetition(token, petition.id)
      .then(() => console.log("rechazado"))
      .catch((e) => console.error(e))
  }

  return (
    <LayoutItem className="border-primary flex items-center">
      <section className="grid gap-3 w-full">
        <h3 className="text-primary font-bold">{petition.topic.title}</h3>
        <p className="text-sm">{petition.topic.description}</p>
        <Chip color={petition.isAccepted ? "success" : "danger"} variant="flat">
          {" "}
          {petition.isAccepted ? "Aceptado" : "Rechazado"}{" "}
        </Chip>
      </section>
      <section className="flex items-end gap-2 h-full">
        <Button
          radius="sm"
          color="danger"
          variant="ghost"
          className="font-semibold"
          onPress={rejectPetition}
        >
          Rechazar
        </Button>
        <Button
          radius="sm"
          color="primary"
          variant="solid"
          className="text-white font-semibold"
          onPress={acceptPetition}
        >
          Aceptar
        </Button>
      </section>
    </LayoutItem>
  );
};
