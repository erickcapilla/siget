import {
  Textarea,
  RadioGroup,
  Radio,
  Input,
  Button,
  Select,
  SelectItem,
  Avatar,
  AvatarIcon,
  Chip,
  SelectedItems,
} from "@nextui-org/react";
import { useUser, useTopic } from "@/hooks";
import userServices from "@/services/UserServices";
import graduationsOptionsServices from "@/services/GraduationsOptionsServices";
import { useState, useEffect, useCallback } from "react";
import { Topic, TopicResponse, Option, User } from "@/types";
import { optionNames } from "@/utils/utils";

interface Props {
  view: string;
}

export const TopicForm = ({ view }: Props) => {
  const { degrees } = useUser();
  const { setUserTopics, saveTopic } = useTopic();
  const [users, setUsers] = useState<User[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [topic, setTopic] = useState<Topic>({
    title: "",
    description: "",
    degreeProgram: "",
    graduationOption: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTopic({ ...topic, [e.target.name]: e.target.value });
  };

  const handleGetUsers = useCallback(async () => {
    try {
      const res = await userServices.getUsers();
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleGetOptions = useCallback(async () => {
    try {
      const res = await graduationsOptionsServices.getOptions();
      const data = await res.json();
      setOptions(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<EventTarget | HTMLFormElement>) => {
    e.preventDefault();

    saveTopic(topic)
      .then(
        (data) =>
          view === "user" &&
          setUserTopics((prev) => [...prev, data as unknown as TopicResponse])
      )
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    users.length === 0 && handleGetUsers();
    options.length === 0 && handleGetOptions();
  }, [handleGetUsers, handleGetOptions, users, options]);

  return (
    <form
      className="flex flex-col justify-between h-full"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5">
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
        <RadioGroup
          name="graduationOption"
          label="Selecciona tipo de documento"
          orientation="horizontal"
          className="text-sm"
          isRequired
          onChange={handleChange}
        >
          {options.map((option) => (
            <Radio
              key={option.id}
              value={option.id}
              classNames={{ label: "text-sm" }}
            >
              {optionNames[option.name as keyof typeof optionNames]}
            </Radio>
          ))}
        </RadioGroup>
        <Select
          name="degreeProgram"
          label="Programa académico"
          placeholder="Selecciona tu programa académico"
          color="primary"
          variant="underlined"
          classNames={{
            base: "text-black",
          }}
          className="mt-[-.5rem]"
          isRequired
          onChange={handleChange}
        >
          {degrees.map((degree) => (
            <SelectItem key={degree.id} value={degree.id}>
              {degree.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          items={users}
          label="Selecciona un colaborador (opcional)"
          variant="bordered"
          color="primary"
          placeholder="Selecciona un usuario"
          labelPlacement="outside"
          classNames={{
            trigger: "min-h-12 py-2",
            label: "text-left text-black",
          }}
          renderValue={(items: SelectedItems<User>) => {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip key={item.key} color="primary" variant="flat">
                    {item.data.userInformation ? item.data.userInformation.name +
                      " " +
                      item.data.userInformation.fatherLastName : "Usuario"}
                  </Chip>
                ))}
              </div>
            );
          }}
          onChange={(e) =>
            setTopic(
              e.target.value.length > 0
                ? { ...topic, collaborator: e.target.value }
                : { ...topic }
            )
          }
        >
          {(user) => (
            <SelectItem key={user.id} textValue={"User"}>
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={"User"}
                  className="flex-shrink-0"
                  size="sm"
                  icon={<AvatarIcon />}
                />
                <div className="flex flex-col">
                  <span className="text-small">
                    {user.userInformation ? user.userInformation.name +
                      " " +
                      user.userInformation.fatherLastName : "Usuario"}
                  </span>
                  <span className="text-tiny text-default-400">
                    {user.email}
                  </span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
      </div>
      <Button
        type="submit"
        color="primary"
        radius="sm"
        size="md"
        className="max-[640px]:mt-5"
      >
        Agregar tema
      </Button>
    </form>
  );
};
