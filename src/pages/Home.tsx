import { LayoutMain } from "@components/layouts";
import { DocumentProgressCard } from "@/components/features/document";
import { DegreeProgressCard } from "@/components/features/degree";
import { ScheduleCard } from "@/components/features";
import { NotInformation } from "@/components/features/users";
import { useUser } from "@/hooks";
import "@css/Home.css";

export const Home = () => {
  const { information } = useUser();

  return (
    <>
      <LayoutMain>
        <div className="layout">
          {information ? null : <NotInformation />}
          <DocumentProgressCard />
          <div className="flex gap-3 w-full">
            <ScheduleCard />
            <DegreeProgressCard />
          </div>
        </div>
      </LayoutMain>
    </>
  );
};
