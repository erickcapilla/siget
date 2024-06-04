import { LayoutMain } from "@components/layouts";
import {
  NotInformation,
  Panel,
  NoTopic,
  ScheduleList,
  NoDegree,
  ProgressDocument,
} from "@/components/features";
import { useUser, useTopic } from "@/hooks";
import "@css/Home.css";
import { Chip, Avatar, AvatarIcon } from "@nextui-org/react";

export const Home = () => {
  const { information, role } = useUser();
  const { userRequestsAccepted } = useTopic();
  console.log(userRequestsAccepted);

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
          <article className="w-full h-full overflow-hidden">
            {role === "STUDENT_ROLE" && userRequestsAccepted ? (
              <>
                <section className="w-full flex gap-5 h-auto">
                  <Chip
                    color="success"
                    variant="flat"
                    avatar={<Avatar icon={<AvatarIcon />} classNames={{icon: "text-white"}} />}
                  >
                    {userRequestsAccepted.items[0].requestedBy.name +
                      " " +
                      userRequestsAccepted.items[0].requestedBy.fatherLastName +
                      " " +
                      userRequestsAccepted.items[0].requestedBy.motherLastName}
                  </Chip>
                  <Chip
                    color="warning"
                    variant="flat"
                    avatar={<Avatar icon={<AvatarIcon />} classNames={{icon: "text-white"}} />}
                  >
                    {userRequestsAccepted.items[0].acceptedBy.name +
                      " " +
                      userRequestsAccepted.items[0].acceptedBy.fatherLastName +
                      " " +
                      userRequestsAccepted.items[0].acceptedBy.motherLastName}
                  </Chip>
                </section>
                <section className="w-full h-full overflow-hidden grid items-center px-3 pb-10">
                  <ProgressDocument />
                </section>
              </>
            ) : (
              <NoTopic />
            )}
          </article>
        </Panel>
        <div className="flex gap-3 w-full h-1/2 pb-3">
          <Panel title="Agenda" className="w-full max-w-96 h-full">
            <ScheduleList />
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
