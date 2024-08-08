import { ShieldExclamation } from "@/components/icons";
import { Button, Link } from "@nextui-org/react";

export const NotInformation = () => {
  return (
    <article className="flex items-center justify-between flex-wrap border-2 border-danger-500 rounded-md p-3 w-full">
      <section className="flex items-center gap-3">
        <ShieldExclamation
          className="stroke-danger-500"
          size={50}
          color="#F31260"
        />
        <div>
          <h2 className="font-bold text-danger-500 text-lg">
            No se ha encontrado información del usuario
          </h2>
          <p>Completa tu información para poder usar <strong>SIGET</strong></p>
        </div>
      </section>
      <section>
        <Button
          as={Link}
          href="/profile"
          radius="sm"
          variant="ghost"
          color="danger"
          className="font-bold"
        >
          Completar información
        </Button>
      </section>
    </article>
  );
};
