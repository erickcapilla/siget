import { LayoutMain } from "@/layouts";
import {
  ScheduleSection,
  CardInfo,
  DocumentProgressSection,
  AdviceSection,
  AdvicedsSection,
  Panel,
  TopicsSection,
  UsersSection,
  AdminSection,
  StudentsSection,
  AllAcceptedTopicsSection,
  NotFoundLayout,
  ReviewsSection,
} from "@/components/features";
import { Features } from "@/components/unDraws";
import { useAuth } from "@/hooks";
import { ROLES } from "@/utils";
import { useState } from "react";
import { DegreeResponse, GraduationResponse } from "@/types/admin";

export const Home = () => {
  const { user, role, acceptedTopics } = useAuth();
  const [degrees, setDegrees] = useState<DegreeResponse[]>([]);
  const [graduations, setGraduations] = useState<GraduationResponse[]>([]);

  return (
    <LayoutMain>
      <article className="flex flex-col gap-2 size-full">
        {!user.userInformation && (
          <CardInfo
            title="Completa tu información"
            description="Es necesario que completes tu información para poder utilizar la plataforma. Ingresa a tu perfil y llena los campos necesarios. Presiona aquí."
            color="danger"
            href="/profile"
          />
        )}

        <section className="w-full h-1/2">
          {role == ROLES.STUDENT && acceptedTopics.length > 0 && (
            <Panel title="Progreso de Documento">
              <DocumentProgressSection />
            </Panel>
          )}
          {role === ROLES.STUDENT && acceptedTopics.length === 0 && (
            <Panel title="Temas">
              <TopicsSection />
            </Panel>
          )}
          {role === ROLES.ADVISOR && (
            <Panel title="Asesorados">
              <AdvicedsSection />
            </Panel>
          )}
          {role === ROLES.ADMIN && (
            <Panel title="Usuarios">
              <UsersSection />
            </Panel>
          )}
          {role === ROLES.SUBJECT_HOLDER && (
            <Panel title="Temas aceptados">
              <AllAcceptedTopicsSection />
            </Panel>
          )}
          {role === ROLES.REVIEWER && (
            <Panel title="Temas asignados">
              <ReviewsSection />
            </Panel>
          )}
        </section>

        <section className="flex max-md:flex-col gap-2 w-full h-1/2">
          <div className="md:max-w-sm size-full">
            <Panel title="Agenda" className="pb-2">
              <ScheduleSection />
            </Panel>
          </div>

          <div className="size-full">
            {role === ROLES.STUDENT && (
              <Panel title="Asesorías">
                <AdviceSection />
              </Panel>
            )}
            {role === ROLES.ADVISOR && (
              <Panel title="Temas">
                <TopicsSection />
              </Panel>
            )}
            {role === ROLES.ADMIN && (
              <Panel title="Administar">
                <AdminSection
                  setDegrees={setDegrees}
                  degrees={degrees}
                  setGraduations={setGraduations}
                  graduations={graduations}
                />
              </Panel>
            )}
            {role === ROLES.SUBJECT_HOLDER && (
              <Panel title="Estudiantes">
                <StudentsSection />
              </Panel>
            )}
            {role === ROLES.REVIEWER && (
              <Panel title="Upps!">
                <NotFoundLayout
                  title="Pronto abrá más"
                  description="Estamos trabajando en nuevas funcionalidades"
                >
                  <Features />
                </NotFoundLayout>
              </Panel>
            )}
          </div>
        </section>
      </article>
    </LayoutMain>
  );
};
