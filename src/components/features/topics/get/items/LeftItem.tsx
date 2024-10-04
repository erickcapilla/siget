import { User, Chip, Tooltip, Button, AvatarIcon, Link } from "@nextui-org/react";
import { DownloadOutline } from "@/components/icons";
import { LayoutItem } from "@/layouts";
import { AcceptedTopic } from "@/types/topic";
import { TopicUser } from "@/types/user";
import { optionNames } from "@/utils/utils";
import userServices from "@/services/UserServices";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";

import "@/css/topic.css";

interface Props {
  topic: AcceptedTopic;
}

export const LeftItem = ({ topic }: Props) => {
  const [user, setUser] = useState<TopicUser>(null);
  const { token } = useAuth();
  const userName = user
    ? `${user.userInformation.name} ${user.userInformation.fatherLastName}`
    : "Usuario";

  useEffect(() => {
    if (topic.requestedBy) {
      userServices
        .getUser(token, topic.requestedBy.id)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((e) => console.error(e));
    }
    if (topic.acceptedBy) {
      userServices
        .getUser(token, topic.acceptedBy.id)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((e) => console.error(e));
    }
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
            <User
              name={userName}
              description="Asesor propietario"
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
          </div>
          <div className="flex gap-2">
            <Tooltip
              content={"Descargar documento"}
              radius="sm"
              className="text-primary font-bold w-full"
            >
              <Button
                as={Link}
                color="primary"
                variant="ghost"
                size="md"
                isIconOnly
                radius="sm"
                className="group w-full @sm:max-w-20"
                download
                href={`${import.meta.env.VITE_API_URL}/files/document/${topic.id}.pdf`}
                target="_blank"
              >
                <DownloadOutline className="size-6 fill-primary group-hover:fill-white" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </section>
    </LayoutItem>
  );
};
