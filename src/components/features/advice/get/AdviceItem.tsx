import { LayoutItem } from "@/layouts";
import { Chip, User, Button, Tooltip, AvatarIcon } from "@nextui-org/react";
import { useUser } from "@/hooks";
import advisoryServices from "@/services/AdvisoryServices";

interface Props {
  advisory: [];
  setAdvisories: React.Dispatch<React.SetStateAction<any[]>>;
}

export const AdviceItem = ({ advisory, setAdvisories }: Props) => {
  const { role } = useUser();

  const deleteAdvisory = () => {
    advisoryServices
      .deleteAdvisory(advisory.id)
      .then(() => setAdvisories((prev) => prev.filter((user) => advisory.id !== user.id)))
      .then(() => console.log("Advisory deleted"))
      .catch((error) => console.error(error));
  };

  const signAdvisory = () => {
    advisoryServices
      .signAdvisory(advisory.id)
      .then(() => console.log("Advisory Firmada"))
      .catch((error) => console.error(error));
  };
  return (
    <LayoutItem className="border-primary">
      <section className="grid gap-3 w-full">
        <h3 className="text-primary font-bold">{advisory.reviewedTopic}</h3>
        <p className="text-sm">{advisory.observations}</p>
        <div className="flex items-center w-full">
          <div className="flex gap-2 items-center">
            <Chip size="sm" color="success" variant="flat">
              {advisory.date}
            </Chip>
            <Chip
              size="sm"
              color={advisory.isSigned ? "success" : "danger"}
              variant="flat"
            >
              {advisory.isSigned ? "Firmado" : "No firmado"}
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
          description="Autor"
          avatarProps={{
            showFallback: false,
            size: "sm",
            fallback: <AvatarIcon />,
            classNames: {
              fallback: `text-white w-full`,
            },
          }}
          className="font-bold w-full justify-center"
          classNames={{
            description: "text-[0.7rem] text-gray-700",
            name: "font-bold",
          }}
        />
        {role === "ASESOR_ROLE" && !advisory.isSigned ? (
          <Tooltip
            content="Firmar"
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
              onPress={signAdvisory}
            >
              Firmar asesoría
            </Button>
          </Tooltip>
        ) : (
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
              onPress={deleteAdvisory}
            >
              Eliminar asesoría
            </Button>
          </Tooltip>
        )}
      </section>
    </LayoutItem>
  );
};
