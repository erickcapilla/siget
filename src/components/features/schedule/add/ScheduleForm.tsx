import { Input, Button, TimeInput, DatePicker } from "@nextui-org/react";
import { now, parseAbsoluteToLocal } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { AppointmentData, AppointmentResponse } from "@/types/schedule";
import scheduleServices from "@/services/ScheduleServices";
import { useState } from "react";
import { UsersSelect } from "@/components/features";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

interface Props {
  setUserAppointments: React.Dispatch<
    React.SetStateAction<AppointmentResponse[]>
  >;
}

export const ScheduleForm = ({ setUserAppointments }: Props) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState<AppointmentData>({
    topic: "",
    location: "",
    date: "",
    time: "",
    participants: [""],
    invitee: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<EventTarget | HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    scheduleServices
      .createAppointment(token, appointment)
      .then((response) => response.json())
      .then((data) => setUserAppointments((prev) => [...prev, data]))
      .then(() => toast.success("Cita agendada"))
      .catch((error) => toast.error(error.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <form
      className="flex flex-col justify-between h-full"
      onSubmit={handleSubmit}
    >
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
        <I18nProvider locale="es-MX">
          <DatePicker
            showMonthAndYearPickers
            name="date"
            label="Fecha de la cita"
            variant="bordered"
            color="primary"
            minValue={parseAbsoluteToLocal(
              now("UTC").toDate().toISOString()
            ).add({ days: 1 })}
            maxValue={parseAbsoluteToLocal(
              now("UTC").toDate().toISOString()
            ).add({ months: 6 })}
            radius="sm"
            isRequired
            onChange={(e) => {
              setAppointment({
                ...appointment,
                date: e.toDate("UTC").toISOString(),
              });
            }}
          />
        </I18nProvider>
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
        <UsersSelect
          onChange={(e) =>
            setAppointment({
              ...appointment,
              invitee: e?.toString(),
              participants: [e?.toString()],
            })
          }
        />
      </div>
      <div>
        <Button
          type="submit"
          color="primary"
          variant="solid"
          radius="sm"
          className="w-full"
          isLoading={loading}
        >
          {loading ? "Agendando" : "Agendar"}
        </Button>
      </div>
    </form>
  );
};
