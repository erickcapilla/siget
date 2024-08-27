import {
  Avatar,
  AvatarIcon,
  Select,
  SelectItem,
  Chip,
  Button,
} from "@nextui-org/react";
import { roleNames } from "@/utils/utils";
import { useAuth } from "@/hooks";
import { CardInfo } from "@/components/features";
import { useState } from "react";
import sendEmailForgotPassword from "@/services/AuthServices";
import toast from "react-hot-toast";

export const Details = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, token } = useAuth();

  const sendEmail = async () => {
    try {
      setIsLoading(true);
      await sendEmailForgotPassword.sendEmailForgotPassword(token, user.user.email);
      toast.success("Código envíado. Revisa tu correo electrónico.");
    } catch (error) {
      toast.error(error.toString());
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="flex flex-col items-center justify-between gap-10 size-full">
      {user && (
        <section className="w-full grid gap-8">
          <div className="flex flex-col items-center gap-3 w-full">
            <Avatar
              fallback={<AvatarIcon />}
              size="lg"
              isBordered
              color="primary"
              classNames={{
                base: "bg-white",
                fallback: "text-primary w-full",
              }}
            />
            <h3 className="text-center font-bold text-base">
              {user.userInformation &&
                `${user.userInformation.name} ${user.userInformation.fatherLastName} ${user.userInformation.motherLastName}`}
            </h3>
            <h3 className="text-center mt-[-.5rem] text-sm text-gray-500">
              {user.userInformation && user.user.email}
            </h3>
            <Select
              label="Roles"
              placeholder={
                roleNames[user.user.roles[0] as keyof typeof roleNames]
              }
              color="secondary"
              variant="underlined"
              classNames={{
                base: "text-black",
              }}
            >
              {user.user.roles.map((role) => (
                <SelectItem key={role} value={role} isReadOnly>
                  {roleNames[role as keyof typeof roleNames]}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="grid gap-5">
            <div className="w-full grid gap-3">
              <h3 className="text-black text-sm">Programas académicos</h3>
              <div className="size-full flex gap-1 flex-wrap">
                {user.userInformation &&
                  user.userDegreePrograms.map((degree) => (
                    <Chip
                      key={degree.id}
                      color="secondary"
                      variant="flat"
                      size="sm"
                      radius="sm"
                    >
                      {degree.name.charAt(0).toUpperCase() +
                        degree.name.slice(1).replace(/-/g, " ")}
                    </Chip>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="grid gap-2">
        <CardInfo
          title="¿Eres nuevo?"
          description="Te recomendamos cambiar tu contraseña. Presiona el botón, revisa tu correo, sigue las intrucciones que se indican."
          color="danger"
        />
        <Button
          className="w-full"
          color="danger"
          radius="sm"
          variant="flat"
          onPress={() => {
            toast((t) => (
              <span>
                ¿Estás seguro de cambiar tu contraseña?
                <Button
                  className="m-2"
                  color="danger"
                  size="sm"
                  variant="flat"
                  onPress={() => {
                    sendEmail();
                    toast.dismiss(t.id);
                  }}
                >
                  Cambiar
                </Button>
                <Button
                  className="m-2"
                  size="sm"
                  variant="flat"
                  onPress={() => {
                    toast.dismiss(t.id);
                  }}
                >
                  Cancelar
                </Button>
              </span>
            ));
          }}
          isLoading={isLoading}
        >
          Cambiar contraseña
        </Button>
      </section>
    </article>
  );
};
