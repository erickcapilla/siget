import { LayoutMain } from "@/layouts";
import {
  ScheduleSection,
  CardInfo,
  DocumentProgressSection,
  AdviceSection,
} from "@/components/features";
import { useUser } from "@/hooks";
import { Spinner } from "@nextui-org/react";

export const Home = () => {
  const { information, isLoading } = useUser();
  return (
    <LayoutMain>
      {isLoading && (
        <div className="size-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <article className="flex flex-col gap-2 size-full">
          {!information && (
            <CardInfo
              title="Completa tu información"
              description="Es necesario que completes tu información para poder utilizar la plataforma. Ingresa a tu perfil y llena los campos necesarios. Presiona aquí."
              color="danger"
              href="/profile"
            />
          )}
          <section className="w-full h-1/2">
            <DocumentProgressSection />
          </section>
          <section className="flex max-md:flex-col gap-2 w-full h-1/2">
            <div className="md:max-w-sm size-full">
              <ScheduleSection />
            </div>
            <div className="size-full">
              <AdviceSection />
            </div>
          </section>
        </article>
      )}
    </LayoutMain>
  );
};
