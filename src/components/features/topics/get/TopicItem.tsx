import { User, Chip, Tooltip, Button, AvatarIcon } from "@nextui-org/react";
import { ThumbupIcon, TrashIcon } from "@/assets/icons";
import { LayoutItem } from "@/components/layouts";
import { TopicResponse, UserResponse } from "@/types";
import { optionNames } from "@/utils/utils";
import userServices from "@/services/UserServices";
import { useTopic } from "@/hooks";
import { useEffect, useState } from "react";

interface Props {
  topic: TopicResponse;
  view: string;
}

export const TopicItem = ({ topic, view }: Props) => {
  const { deleteTopic } = useTopic();
  const [user, setUser] = useState<UserResponse>(null);
  const [collaborator, setCollaborator] = useState<UserResponse>(null);
  const name = user
    ? `${user.userInformation.name.split(" ")[0]} ${
        user.userInformation.fatherLastName
      }`
    : "Usuario";
  const collaboratorName = collaborator
    ? `${collaborator.userInformation.name.split(" ")[0]} ${
        collaborator.userInformation.fatherLastName
      }`
    : "Usuario";

  useEffect(() => {
    userServices
      .getUser(topic.proposedBy.id)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((e) => console.error(e));

    userServices
      .getUser(topic.collaborator.id)
      .then((res) => res.json())
      .then((data) => setCollaborator(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <LayoutItem className="flex-col min-[500px]:flex-row gap-3 border-l-primary">
      <section className="grid gap-3 w-full">
        <h3 className="text-primary font-bold">{topic.title}</h3>
        <p className="text-sm">{topic.description}</p>
        <div className="flex items-center w-full">
          <div className="flex gap-2 items-center">
            <Chip size="sm" color="success" variant="flat">
              {
                optionNames[
                  topic.graduationOption.name as keyof typeof optionNames
                ]
              }
            </Chip>
            <Chip size="sm" color="warning" variant="flat">
              {topic.degreeProgram.name}
            </Chip>
            {collaborator && (
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
                className="w-full justify-start"
                classNames={{
                  description: "text-[0.7rem] text-gray-700",
                  name: "text-xs font-bold",
                }}
              />
            )}
          </div>
        </div>
      </section>
      <section className="flex min-[500px]:flex-col min-[550px]:w-[220px] justify-between w-full">
        <User
          name={name}
          description="Autor"
          avatarProps={{
            showFallback: false,
            size: "sm",
            fallback: <AvatarIcon />,
            classNames: {
              fallback: `text-white w-full`,
            },
          }}
          className="font-bold w-full justify-center"
          classNames={{
            description: "text-xs text-gray-700 font-normal",
            name: "text-sm font-bold",
          }}
        />
        {view === "all" && (
          <Tooltip
            content="Me interesa"
            radius="sm"
            className="text-primary font-bold w-full"
          >
            <Button
              color="primary"
              variant="ghost"
              size="md"
              isIconOnly
              radius="sm"
              className="group w-full"
            >
              <ThumbupIcon className="fill-primary group-hover:fill-white" />
            </Button>
          </Tooltip>
        )}

        {view === "user" && (
          <Tooltip
            content="Eliminar"
            radius="sm"
            className="text-primary font-bold w-full"
          >
            <Button
              color="primary"
              variant="ghost"
              size="md"
              isIconOnly
              radius="sm"
              className="group w-full"
              onPress={() => deleteTopic(topic.id)}
            >
              <TrashIcon className="fill-primary group-hover:fill-white" />
            </Button>
          </Tooltip>
        )}
      </section>
    </LayoutItem>
  );
};
