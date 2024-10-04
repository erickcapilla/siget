import { DoublePanelLayout, LayoutMain } from "@/layouts";
import {
  TopicForm,
  AllTopics,
  UserTopics,
  UserRequests,
  UserPetitions,
  NotFoundLayout,
  Panel,
  LeftTopicsSection,
} from "@/components/features";
import { Chip, Button } from "@nextui-org/react";
import { useState } from "react";
import { TopicResponse } from "@/types/topic";
import { Accepted } from "@/components/unDraws";
import { useAuth } from "@/hooks";
import { ROLES } from "@/utils";

export const Topics = () => {
  const [section, setSection] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [userTopics, setUserTopics] = useState<TopicResponse[]>([]);
  const { acceptedTopics, role } = useAuth();

  const handleView = async (type: string) => {
    setSection(type);
  };

  return (
    <>
      {role === ROLES.STUDENT && acceptedTopics.length > 0 ? (
        <LayoutMain>
          <Panel title="">
            <NotFoundLayout
              title="¡Felicidades!"
              description="Ya tienes un tema aceptado. Visita la sección de asesorías y documento."
            >
              <Accepted className="w-full" />
            </NotFoundLayout>
          </Panel>
        </LayoutMain>
      ) : (
        <DoublePanelLayout
          titleLeft="Agregar tema"
          title="Temas"
          subtitleLeft="Presiona para agregar tema"
          contentLeft={<TopicForm setUserTopics={setUserTopics} />}
        >
          <article className="w-full grid gap-3">
            <section className="w-full flex gap-3 overflow-auto py-2">
              <Chip
                as={Button}
                size="md"
                variant="flat"
                color={section === "all" ? "primary" : "default"}
                onPress={() => handleView("all")}
                isLoading={section === "all" && isLoading}
              >
                {role === ROLES.STUDENT ? "De asesores" : "De estudiantes"}
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
              <Chip
                as={Button}
                size="md"
                variant="flat"
                color={section === "lefts" ? "primary" : "default"}
                onPress={() => handleView("lefts")}
                isLoading={section === "lefts" && isLoading}
              >
                Temas abandonados
              </Chip>
            </section>
            <section className="overflow-y-auto">
              {section === "all" && <AllTopics setIsLoading={setIsLoading} />}
              {section === "user" && (
                <UserTopics
                  setIsLoading={setIsLoading}
                  setUserTopics={setUserTopics}
                  userTopics={userTopics}
                />
              )}
              {section === "interest" && (
                <UserRequests setIsLoading={setIsLoading} />
              )}
              {section === "proposals" && (
                <UserPetitions setIsLoading={setIsLoading} />
              )}
              {section === "lefts" && (
                <LeftTopicsSection setIsLoading={setIsLoading} />
              )}
            </section>
          </article>
        </DoublePanelLayout>
      )}
    </>
  );
};
