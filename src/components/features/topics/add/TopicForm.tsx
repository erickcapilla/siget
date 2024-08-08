import { Textarea, Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { TopicData, TopicResponse } from "@/types/topic";
import {
  GraduationsSelect,
  DegreesUserSelect,
  EnableUsersSelect,
} from "@/components/features";
import toast from "react-hot-toast";
import topicService from "@/services/TopicServices";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  setUserTopics: React.Dispatch<React.SetStateAction<TopicResponse[]>>;
}

export const TopicForm = ({ setUserTopics }: Props) => {
  const [topic, setTopic] = useState<TopicData>({} as TopicData);
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
      .saveTopic(token, topic)
      .then((response) => response.json())
      .then((data) => setUserTopics((prev) => [data, ...prev]))
      .then(() => toast.success("Tema agregado correctamente"))
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
          onChange={handleChange}
        />
        <GraduationsSelect onChange={handleChange} />
        <DegreesUserSelect onChange={handleChange} />
        <EnableUsersSelect
          onChange={(e) =>
            setTopic(
              e !== null
                ? { ...topic, collaborator: e.toString() }
                : { ...topic, collaborator: null }
            )
          }
        />
      </div>
      <Button
        type="submit"
        color="primary"
        radius="sm"
        size="md"
        className="max-[640px]:mt-5"
        isLoading={isLoading}
      >
        Agregar tema
      </Button>
    </form>
  );
};
