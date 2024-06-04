import { LayoutMain } from "@components/layouts";
import {
  NotInformation,
  Panel,
  NoTopic,
  NoAppointments,
  NoDegree,
  ProgressDocument,
} from "@/components/features";
import { useUser, useTopic } from "@/hooks";
import "@css/Home.css";

export const Home = () => {
  const { information, role } = useUser();
  const { userRequestsAccepted } = useTopic();
  console.log(userRequestsAccepted)

  return (
    <LayoutMain>
      <div className="layout h-full overflow-hidden">
        {information ? null : <NotInformation />}
        <Panel
          title={
            role === "STUDENT_ROLE" ? "Progreso de documento" : "Asesorados"
          }
          className="h-1/2"
        >
          <div className="w-full h-full overflow-hidden grid items-center px-3">
            {role === "STUDENT_ROLE" && !userRequestsAccepted ? (
              <NoTopic />
            ) : (
              <ProgressDocument />
            )}
          </div>
        </Panel>
        <div className="flex gap-3 w-full h-1/2 pb-3">
          <Panel title="Agenda" className="w-full max-w-96 h-full">
            <NoAppointments />
          </Panel>
          <Panel
            title={role === "STUDENT_ROLE" ? "Progreso de titulación" : ""}
            className="h-full"
          >
            <NoDegree />
          </Panel>
        </div>
      </div>
    </LayoutMain>
  );
};
