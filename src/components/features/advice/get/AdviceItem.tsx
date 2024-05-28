import { LayoutItem } from "@/components/layouts";
import { Chip, User, Button, Tooltip, AvatarIcon } from "@nextui-org/react";

export const AdviceItem = () => {
  return (
    <LayoutItem className="border-primary">
      <section className="grid gap-3 w-full">
        <h3 className="text-primary font-bold">Titulo del proyecto</h3>
        <p className="text-sm">Tema revisado</p>
        <p className="text-sm">Observaciones</p>
        <div className="flex items-center w-full">
          <div className="flex gap-2 items-center">
            <Chip size="sm" color="success" variant="flat">
              Prototipo
            </Chip>
            <Chip size="sm" color="warning" variant="flat">
              Ingeniería en computación
            </Chip>
              <User
                name="Erick Capilla"
                description="Colaborador"
                avatarProps={{
                  showFallback: false,
                  size: "sm",
                  fallback: <AvatarIcon />,
                  classNames: {
                    fallback: `text-white w-full`,
                  },
                }}
                className="w-full justify-start"
                classNames={{
                  description: "text-[0.7rem] text-gray-700",
                  name: "text-xs font-bold",
                }}
              />
          </div>
        </div>
      </section>
      <section className="flex min-[500px]:flex-col min-[550px]:w-[220px] justify-between w-full">
        <User
          name="Josa Perez"
          avatarProps={{
            showFallback: false,
            size: "sm",
            fallback: <AvatarIcon />,
            classNames: {
              fallback: `text-white w-full`,
            },
          }}
          className="font-bold w-full justify-center"
        />
          <Tooltip
            content="Eliminar"
            radius="sm"
            className="text-primary font-bold w-full"
          >
            <Button
              color="primary"
              variant="ghost"
              size="md"
              isIconOnly
              radius="sm"
              className="group w-full"
            >
              Firmar asesoría
            </Button>
          </Tooltip>
      </section>
    </LayoutItem>
  );
};
