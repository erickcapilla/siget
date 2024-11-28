import { LayoutItem } from "@/layouts";
import { PetitionTopic } from "@/types/topic";
import { Chip, Button, User, AvatarIcon } from "@nextui-org/react";
import requestTopicServices from "@/services/RequestTopicServices";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

interface Props {
  petition: PetitionTopic;
}

export const PetitionItem = ({ petition }: Props) => {
  const { token, setAcceptedTopics } = useAuth();
  const userName =
  petition.requestedBy.userInformation
      ? `${petition.requestedBy.userInformation.name} ${petition.requestedBy.userInformation.fatherLastName}`
      : "Usuario";

  const acceptPetition = () => {
    requestTopicServices
      .acceptPetition(token, petition.id)
      .then(res => res.json())
      .then(data => {
        setAcceptedTopics((topics) => [...topics, data]);
      })
      .then(() => toast.success("Tema aceptado"))
      .catch((e) => toast.error(e.toString()));
  };

  const rejectPetition = () => {
    requestTopicServices
      .deletePetition(token, petition.id)
      .then(() => toast.success("Tema rechazado"))
      .catch((e) => toast.error(e.toString()));
  };

  return (
    <LayoutItem className="border-primary flex items-center flex-col @md:flex-row gap-3">
      <section className="grid gap-3 w-full">
        <h3 className="text-primary font-bold">{petition.topic.title}</h3>
        <p className="text-sm">{petition.topic.description}</p>
        {petition.isAccepted && (
          <Chip
            className="justify-self-end"
            color="success"
            variant="flat"
            size="sm"
          >
            Aceptado
          </Chip>
        )}
        <User
          name={userName}
          description="Interasado en el tema"
          avatarProps={{
            showFallback: false,
            size: "sm",
            fallback: <AvatarIcon />,
            classNames: {
              fallback: `text-white w-full`,
            },
          }}
          className="font-bold justify-self-start"
          classNames={{
            description: "text-[0.7rem] text-gray-700 font-normal",
            name: "text-xs font-bold",
          }}
        />
      </section>
      {!petition.isAccepted && (
        <section className="flex gap-2 w-full h-full items-end">
          <>
            <Button
              radius="sm"
              color="danger"
              variant="flat"
              className="font-semibold w-full"
              onPress={() => {
                toast((t) => (
                  <span>
                    ¿Estás seguro de rechazar esta solicitud?
                    <Button
                      color="danger"
                      size="sm"
                      variant="flat"
                      className="m-2"
                      onPress={() => {
                        rejectPetition();
                        toast.dismiss(t.id);
                      }}
                    >
                      Rechazar solicitud
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      className="m-2"
                      onPress={() => {
                        toast.dismiss(t.id);
                      }}
                    >
                      Cancelar
                    </Button>
                  </span>
                ));
              }}
              size="sm"
            >
              Rechazar
            </Button>
            <Button
              radius="sm"
              color="success"
              variant="flat"
              size="sm"
              className="font-semibold w-full"
              onPress={() => {
                toast((t) => (
                  <span>
                    ¿Estás seguro de aceptar esta solicitud?
                    <Button
                      color="success"
                      size="sm"
                      variant="flat"
                      className="m-2"
                      onPress={() => {
                        acceptPetition();
                        toast.dismiss(t.id);
                      }}
                    >
                      Aceptar solicitud
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      className="m-2"
                      onPress={() => {
                        toast.dismiss(t.id);
                      }}
                    >
                      Cancelar
                    </Button>
                  </span>
                ));
              }}
            >
              Aceptar
            </Button>
          </>
        </section>
      )}
    </LayoutItem>
  );
};
