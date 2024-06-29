import {
  Input,
  Button,
  TimeInput,
  DateInput,
  Select,
  SelectedItems,
  Chip,
  SelectItem,
  Avatar,
  AvatarIcon,
} from "@nextui-org/react";
import { User, Appointment } from "@/types";
import userServices from "@/services/UserServices";
import scheduleServices from "@/services/ScheduleServices"
import { useState, useEffect } from "react";

export const ScheduleForm = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [appointment, setAppointment] = useState<Appointment>({
    topic: "",
    location: "",
    date: "",
    time: "",
    participants: [""],
    invitee: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleGetUsers = async () => {
    try {
      const res = await userServices.getUsers();
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<EventTarget | HTMLFormElement>) => {
    e.preventDefault()
    scheduleServices.createAppointment(appointment)
      .then(() => console.log("Cita agendada"))
      .catch(error => console.error(error))
    console.log(appointment)
  }

  useEffect(() => {
    handleGetUsers();
  }, []);
  return (
    <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
      <div className="grid gap-3 overflow-y-auto pr-2">
        <Input
          name="topic"
          label="Asunto"
          placeholder="Ingresa el asunto de la cita"
          variant="bordered"
          color="primary"
          radius="sm"
          isRequired
          onChange={handleChange}
        />
        <Input
          name="location"
          label="Lugar"
          placeholder="Ingresa el lugar de la cita"
          variant="bordered"
          color="primary"
          radius="sm"
          isRequired
          onChange={handleChange}
        />
        <DateInput
          name="date"
          label="Fecha de la cita"
          variant="bordered"
          color="primary"
          radius="sm"
          isRequired
          onChange={(e) => {
            setAppointment({ ...appointment, date: e.toDate() });
          }}
        />
        <TimeInput
          name="time"
          label="Hora de la cita"
          variant="bordered"
          color="primary"
          radius="sm"
          isRequired
          onChange={(e) => {
            setAppointment({ ...appointment, time: `${e.hour}:${e.minute}` });
          }}
        />
        <Select
          name="participants"
          items={users}
          label="Selecciona participantes"
          variant="bordered"
          color="primary"
          isRequired
          placeholder="Selecciona usuarios"
          labelPlacement="outside"
          selectionMode="multiple"
          classNames={{
            trigger: "h-auto py-2",
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
          onChange={(e) => setAppointment({ ...appointment, participants: e.target.value.split(",") })}
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
        <Select
          name="invitee"
          items={users}
          label="Dirigido a"
          variant="bordered"
          color="primary"
          isRequired
          placeholder="Selecciona un usuario"
          labelPlacement="outside"
          className="mb-3"
          onChange={handleChange}
          classNames={{
            trigger: "h-auto py-2",
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
      <div>
        <Button
          type="submit"
          color="primary"
          variant="solid"
          radius="sm"
          className="w-full"
        >
          Agendar
        </Button>
      </div>
    </form>
  );
};
