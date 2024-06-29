import { NoAppointments } from "./NoAppointments";
import { useEffect, useState } from "react";
import scheduleServices from "@/services/ScheduleServices";
import { ScheduleItem } from "./ScheduleItem";

export const ScheduleList = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentsOther, setAppointmentsOther] = useState([]);

  useEffect(() => {
    scheduleServices
      .getPetitionAppointment()
      .then((res) => res.json())
      .then((data) => setAppointmentsOther(data.schedules))
      .catch((error) => console.error(error));
    scheduleServices
      .getRequestAppointment()
      .then((res) => res.json())
      .then((data) => setAppointments(data.schedules))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="grid gap-2">
      {appointments.length === 0 && appointmentsOther.length === 0 && (
        <NoAppointments />
      )}
      {appointments.length > 0 &&
        appointments.map((appointment) => (
          <ScheduleItem key={appointment.id} appointment={appointment} />
        ))}
      {appointmentsOther.length > 0 &&
        appointmentsOther.map((appointment) => (
          <ScheduleItem key={appointment.id} appointment={appointment} />
        ))}
    </div>
  );
};
