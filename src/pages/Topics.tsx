import { Panel } from "@components/features/ui";
import { Layout } from "@/components/layouts/Layout";
import { TopicForm, TopicsList } from "@/components/features/topics";
import { Accordion, AccordionItem, Chip, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useTopic } from "@/hooks/useTopic";

export const Topics = () => {
  const [view, setView] = useState("all");
  const { getTopics, getUserTopics, getPetitionsTopics, getRequestTopics, loading } = useTopic();

  const handleView = async (type: string) => {
    setView(type);
    if(view === "all")  getTopics();
    if(view === "user") getUserTopics();
    if(view === "interest") getUserTopics();
    if(view === "proposals") getUserTopics();
  };

  useEffect(() => {
    getUserTopics()
    getPetitionsTopics()
    getRequestTopics()
  }, [])

  return (
    <Layout>
      <div className="max-[639px]:hidden h-full w-full">
        <Panel title="Proponer tema">
          <TopicForm view={view} />
        </Panel>
      </div>
      <div className="min-[640px]:hidden h-auto">
        <Accordion
          variant="shadow"
          itemClasses={{
            title: "text-primary font-bold",
            subtitle: "text-gray-500",
          }}
        >
          <AccordionItem
            title="Proponer tema"
            aria-label="Accordion form"
            subtitle="Presiona para proponer un tema nuevo"
          >
            <TopicForm view={view} />
          </AccordionItem>
        </Accordion>
      </div>
      <div className="min-[640px]:min-w-[70%] h-full">
        <Panel title="Temas">
          <article className="w-full grid gap-3">
            <section className="w-full flex gap-3">
              <Chip
                as={Button}
                size="md"
                variant="flat"
                color={view === "all" ? "primary" : "default"}
                onPress={() => handleView("all")}
                isLoading={view === "all" && loading}
              >
                Todos
              </Chip>
              <Chip
                as={Button}
                size="md"
                variant="flat"
                color={view === "user" ? "primary" : "default"}
                onPress={() => handleView("user")}
                isLoading={view === "user" && loading}
              >
                Mis temas
              </Chip>
              <Chip
                as={Button}
                size="md"
                variant="flat"
                color={view === "interest" ? "primary" : "default"}
                onPress={() => handleView("interest")}
                isLoading={view === "interest" && loading}
              >
                Temas de interés
              </Chip>
              <Chip
                as={Button}
                size="md"
                variant="flat"
                color={view === "proposals" ? "primary" : "default"}
                onPress={() => handleView("proposals")}
                isLoading={view === "proposals" && loading}
              >
                Propuestas
              </Chip>
            </section>
            <TopicsList view={view} />
          </article>
        </Panel>
      </div>
    </Layout>
  );
};
