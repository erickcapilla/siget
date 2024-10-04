import { User, Chip, Tooltip, Button, AvatarIcon } from "@nextui-org/react";
import { ThumbupIcon, TrashIcon } from "@/components/icons";
import { LayoutItem } from "@/layouts";
import { TopicResponse } from "@/types/topic";
import { TopicUser } from "@/types/user";
import { optionNames } from "@/utils/utils";
import userServices from "@/services/UserServices";
import requestTopicServices from "@/services/RequestTopicServices";
import topicServices from "@/services/TopicServices";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks";
import { EditTopic } from "@/components/features";

import "@/css/topic.css";

interface Props {
  topic: TopicResponse;
  isUser: boolean;
  setUserTopics?: React.Dispatch<React.SetStateAction<TopicResponse[]>>;
}

export const TopicItem = ({ topic, isUser, setUserTopics }: Props) => {
  const [user, setUser] = useState<TopicUser>(null);
  const [collaborator, setCollaborator] = useState<TopicUser>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const userName = user
    ? `${user.userInformation.name} ${user.userInformation.fatherLastName}`
    : "Usuario";
  const collaboratorName =
    collaborator !== null && collaborator.userInformation
      ? `${collaborator.userInformation.name} ${collaborator.userInformation.fatherLastName}`
      : "Usuario";

  const createRequest = () => {
    setIsLoading(true);
    requestTopicServices
      .createRequestTopic(token, topic.id)
      .then(() => toast.success("Solicitud enviada"))
      .catch((e) => toast.error(e.toString()))
      .finally(() => setIsLoading(false));
  };

  const deleteTopic = () => {
    setIsLoading(true);
    topicServices
      .deleteTopic(token, topic.id)
      .then(() =>
        setUserTopics((prev) => prev.filter((t) => t.id !== topic.id))
      )
      .then(() => toast.success("Tema eliminado"))
      .catch((e) => toast.error(e.toString()))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    userServices
      .getUser(token, topic.proposedBy.id)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((e) => console.error(e));

    topic.collaborator != null &&
      userServices
        .getUser(token, topic.collaborator.id)
        .then((res) => res.json())
        .then((data) => setCollaborator(data))
        .catch((e) => console.error(e));
  }, []);

  return (
    <LayoutItem className="flex-col @lg:flex-row gap-3 border-l-primary">
      <section className="grid gap-5 w-full">
        <h3 className="text-primary font-bold">{topic.title}</h3>
        <p className="text-sm">{topic.description}</p>
        <div className="flex flex-col @md:flex-row @md:justify-between @md:items-center gap-5 w-full">
          <div className="flex gap-3 items-center flex-wrap">
            <Chip size="sm" color="success" variant="flat">
              {
                optionNames[
                  topic.graduationOption.name as keyof typeof optionNames
                ]
              }
            </Chip>
            <Chip size="sm" color="warning" variant="flat">
              {topic.degreeProgram.name.charAt(0).toUpperCase() +
                topic.degreeProgram.name.slice(1).replace(/-/g, " ")}
            </Chip>
            {!isUser && (
              <User
                name={userName}
                description="Autor"
                avatarProps={{
                  showFallback: false,
                  size: "sm",
                  fallback: <AvatarIcon />,
                  classNames: {
                    fallback: `text-white w-full`,
                  },
                }}
                className="font-bold"
                classNames={{
                  description: "text-[0.7rem] text-gray-700 font-normal",
                  name: "text-xs font-bold",
                }}
              />
            )}
            {topic.collaborator != null && (
              <User
                name={collaboratorName}
                description="Colaborador"
                avatarProps={{
                  showFallback: false,
                  size: "sm",
                  fallback: <AvatarIcon />,
                  classNames: {
                    fallback: `text-white w-full`,
                  },
                }}
                className="font-bold"
                classNames={{
                  description: "text-[0.7rem] text-gray-700 font-normal",
                  name: "text-xs font-bold",
                }}
              />
            )}
          </div>
          <div className="flex gap-2">
            {isUser && <EditTopic topicData={topic} setUserTopics={setUserTopics} />}
            <Tooltip
              content={isUser ? "Eliminar tema" : "Solicitar tema"}
              radius="sm"
              className="text-primary font-bold w-full"
            >
              <Button
                color="primary"
                variant="ghost"
                size="md"
                isIconOnly
                radius="sm"
                isLoading={isLoading}
                className="group w-full @sm:max-w-20"
                onPress={() => {
                  toast((t) => (
                    <span>
                      ¿Estás seguro de{" "}
                      {isUser ? "eliminar" : "enviar solicitud de"} este tema?
                      <Button
                        color={isUser ? "danger" : "success"}
                        size="sm"
                        variant="flat"
                        className="m-2"
                        onPress={() => {
                          isUser ? deleteTopic() : createRequest();
                          toast.dismiss(t.id);
                        }}
                      >
                        {isUser ? "Eliminar" : "Enviar solicitud"}
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
                {isUser ? (
                  <TrashIcon className="fill-primary group-hover:fill-white" />
                ) : (
                  <ThumbupIcon className="fill-primary group-hover:fill-white" />
                )}
              </Button>
            </Tooltip>
          </div>
        </div>
      </section>
    </LayoutItem>
  );
};
