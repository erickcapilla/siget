import { LayoutMain } from "@/layouts";
import {
  ScheduleSection,
  CardInfo,
  DocumentProgressSection,
  AdviceSection,
  AdvicedsSection,
  Panel,
  TopicsSection
} from "@/components/features";
import { useUser, useAuth } from "@/hooks";
import { Spinner } from "@nextui-org/react";
import { ROLES } from "@/utils";

export const Home = () => {
  const { information, isLoading } = useUser();
  const { roles } = useAuth();

  return (
    <>
      {isLoading ? (
        <div className="size-full flex items-center justify-center p-5">
          <Spinner />
        </div>
      ) : (
        <LayoutMain>
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
              {roles.includes(ROLES.STUDENT) && (
                <Panel title="Progreso de Documento">
                  <DocumentProgressSection />
                </Panel>
              )}
              {roles.includes(ROLES.ADVISOR) && (
                <Panel title="Asesorados">
                  <AdvicedsSection />
                </Panel>
              )}
            </section>

            <section className="flex max-md:flex-col gap-2 w-full h-1/2">
              <div className="md:max-w-sm size-full">
                <Panel title="Agenda">
                  <ScheduleSection />
                </Panel>
              </div>

              <div className="size-full">
                {roles.includes(ROLES.STUDENT) && (
                  <Panel title="Asesorías">
                    <AdviceSection />
                  </Panel>
                )}
                {roles.includes(ROLES.ADVISOR) && (
                  <Panel title="Temas">
                    <TopicsSection />
                  </Panel>
                )}
              </div>
            </section>
          </article>
        </LayoutMain>
      )}
    </>
  );
};
