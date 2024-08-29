import { Textarea, Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { TopicData, TopicResponse } from "@/types/topic";
import toast from "react-hot-toast";
import topicService from "@/services/TopicServices";
import { useAuth } from "@/hooks/useAuth";
import { GraduationsSelect } from "@/components/features";

interface Props {
  topicData: TopicResponse;
}

export const EditAcceptedTopicForm = ({ topicData }: Props) => {
  const [topic, setTopic] = useState<TopicData>({
    title: topicData.title,
    description: topicData.description,
    graduationOption: topicData.graduationOption.id
  } as TopicData);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTopic({ ...topic, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<EventTarget | HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    topicService
      .updateAcceptedTopic(token, topicData.id, topic)
      .then(() => toast.success("Tema editado correctamente"))
      .catch((error) => toast.error(error.toString()))
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      className="flex flex-col justify-between h-full"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 mb-3">
        <Input
          name="title"
          type="text"
          label="Titulo"
          placeholder="Ingresa un titulo"
          color="primary"
          variant="bordered"
          radius="sm"
          isRequired
          value={topic.title}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          type="text"
          label="Descripción"
          placeholder="Ingresa la descripción de tu tema"
          className="w-full"
          color="primary"
          variant="bordered"
          radius="sm"
          isRequired
          value={topic.description}
          onChange={handleChange}
        />
        <GraduationsSelect onChange={handleChange} />
        <Button
          type="submit"
          color="primary"
          radius="sm"
          size="md"
          className="max-[640px]:mt-5"
          isLoading={isLoading}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
};
