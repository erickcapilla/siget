import { LayoutMain } from "@/layouts";
import { ScheduleSection, CardInfo } from "@/components/features";
import { useUser } from "@/hooks";

export const Home = () => {
  const { information } = useUser();
  return (
    <LayoutMain>
      <article className="flex flex-col gap-2 w-full h-full">
        {!information && (
          <CardInfo
            title="Completa tu información"
            description="Es necesario que completes tu información para poder utilizar la plataforma. Ingresa a tu perfil y llena los campos necesarios. Presiona aquí."
            color="danger"
            href="/profile"
          />
        )}
        <section className="w-full h-1/2"></section>
        <section className="flex max-md:flex-col gap-2 w-full h-1/2">
          <div className="md:max-w-sm w-full h-full">
            <ScheduleSection />
          </div>
          <div className="w-full h-full"></div>
        </section>
      </article>
    </LayoutMain>
  );
};
