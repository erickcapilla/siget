import { DoublePanelLayout } from "@/layouts/DoublePanelLayout";
import {
  TopicForm,
  AllTopics,
  UserTopics,
  UserRequests,
  UserPetitions,
} from "@/components/features";
import { Chip, Button } from "@nextui-org/react";
import { useState } from "react";
import { TopicResponse } from "@/types/topic";

export const Topics = () => {
  const [section, setSection] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [userTopics, setUserTopics] = useState<TopicResponse[]>([]);

  const handleView = async (type: string) => {
    setSection(type);
  };

  return (
    <DoublePanelLayout
      titleLeft="Agregar tema"
      title="Temas"
      subtitleLeft="Presiona para agregar tema"
      contentLeft={<TopicForm setUserTopics={setUserTopics} />}
    >
      <article className="w-full grid gap-3">
        <section className="w-full flex gap-3 overflow-auto scrollbar-hide">
          <Chip
            as={Button}
            size="md"
            variant="flat"
            color={section === "all" ? "primary" : "default"}
            onPress={() => handleView("all")}
            isLoading={section === "all" && isLoading}
          >
            Todos
          </Chip>
          <Chip
            as={Button}
            size="md"
            variant="flat"
            color={section === "user" ? "primary" : "default"}
            onPress={() => handleView("user")}
            isLoading={section === "user" && isLoading}
          >
            Mis temas
          </Chip>
          <Chip
            as={Button}
            size="md"
            variant="flat"
            color={section === "interest" ? "primary" : "default"}
            onPress={() => handleView("interest")}
            isLoading={section === "interest" && isLoading}
          >
            Solicitudes enviadas
          </Chip>
          <Chip
            as={Button}
            size="md"
            variant="flat"
            color={section === "proposals" ? "primary" : "default"}
            onPress={() => handleView("proposals")}
            isLoading={section === "proposals" && isLoading}
          >
            Solicitudes recibidas
          </Chip>
        </section>
        {section === "all" && <AllTopics setIsLoading={setIsLoading} />}
        {section === "user" && (
          <UserTopics
            setIsLoading={setIsLoading}
            setUserTopics={setUserTopics}
            userTopics={userTopics}
          />
        )}
        {section === "interest" && <UserRequests setIsLoading={setIsLoading} />}
        {section === "proposals" && <UserPetitions setIsLoading={setIsLoading} />}
      </article>
    </DoublePanelLayout>
  );
};
