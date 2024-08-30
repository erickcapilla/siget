import {
  CalendarIcon,
  LocationIcon,
  ClockIcon,
} from "@/components/icons/index";
import { LayoutItem } from "@/layouts";
import { AppointmentResponse } from "@/types/schedule";
import { Chip, Avatar, Button } from "@nextui-org/react";
import scheduleServices from "@/services/ScheduleServices";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { formatDay } from "@/utils";

interface Props {
  setUsersAppointments: React.Dispatch<
    React.SetStateAction<AppointmentResponse[]>
  >;
  appointment: AppointmentResponse;
}

export const InvitationItem = ({
  appointment,
  setUsersAppointments,
}: Props) => {
  const statusES = { ACCEPTED: "Aceptada", PENDING: "Pendiente" };
  const sizeIcon = 18;
  const { token } = useAuth();
  const [rejectLoading, setRejectLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);

  const acceptAppointment = () => {
    setAcceptLoading(true);
    scheduleServices
      .acceptAppointment(token, appointment.id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.success("Cita aceptada");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error al aceptar la cita");
      })
      .finally(() => setAcceptLoading(false));
  };

  const rejectAppointment = () => {
    setRejectLoading(true);
    scheduleServices
      .rejectAppointment(token, appointment.id)
      .then((response) => response.json())
      .then((data) => {
        setUsersAppointments((prev) =>
          prev.filter((item) => item.id !== data.id)
        );
      })
      .then(() => toast.success("Cita rechazada"))
      .catch((error) => {
        console.error(error);
        toast.error("Error al rechazar la cita");
      })
      .finally(() => setRejectLoading(false));
  };

  return (
    <LayoutItem className="border-l-secondary">
      <div className="w-full h-full text-sm grid gap-2">
        <div className="text-base">
          <strong> {appointment.topic} </strong>
        </div>
        <div className="flex gap-5 flex-wrap justify-between items-center">
          <article className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-1">
              <LocationIcon size={sizeIcon} /> <p>{appointment.location}</p>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon size={sizeIcon} /> {formatDay(appointment.date)}
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon size={sizeIcon} /> {appointment.time}
            </div>
            <div>
              <Chip
                size="sm"
                avatar={<Avatar color="secondary" />}
                color="secondary"
                variant="flat"
              >
                {" "}
                {`${appointment?.requester.name} ${appointment.requester.fatherLastName}`}{" "}
              </Chip>
            </div>
            <div>
              <Chip
                size="sm"
                color={appointment.status === "ACCEPTED" ? "success" : "danger"}
                variant="flat"
              >
                {" "}
                {statusES[appointment.status]}{" "}
              </Chip>
            </div>
          </article>
          {appointment.status === "PENDING" && (
            <article className="flex gap-2">
              <Button
                color="danger"
                variant="flat"
                radius="sm"
                isLoading={rejectLoading}
                onPress={() => {
                  toast((t) => (
                    <span>
                      ¿Estás seguro de rechazar esta cita?
                      <Button
                        color="danger"
                        size="sm"
                        variant="flat"
                        className="m-2"
                        onPress={() => {
                          rejectAppointment();
                          toast.dismiss(t.id);
                        }}
                      >
                        Rechazar
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        className="m-2"
                        onPress={() => {
                          toast.dismiss(t.id);
                        }}
                      >
                        Cancelar
                      </Button>
                    </span>
                  ));
                }}
              >
                Rechazar
              </Button>
              <Button
                color="success"
                variant="flat"
                radius="sm"
                isLoading={acceptLoading}
                onPress={() => {
                  toast((t) => (
                    <span>
                      ¿Estás seguro de aceptar esta cita?
                      <Button
                        color="success"
                        size="sm"
                        variant="flat"
                        className="m-2"
                        onPress={() => {
                          acceptAppointment();
                          toast.dismiss(t.id);
                        }}
                      >
                        Aceptar
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        className="m-2"
                        onPress={() => {
                          toast.dismiss(t.id);
                        }}
                      >
                        Cancelar
                      </Button>
                    </span>
                  ));
                }}
              >
                Aceptar
              </Button>
            </article>
          )}
        </div>
      </div>
    </LayoutItem>
  );
};
