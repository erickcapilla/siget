import { Avatar, AvatarIcon, Chip } from "@nextui-org/react";
import { roleNames } from "@/utils/utils";
import { CardInfo, EditDegrees } from "@/components/features";
import { TopicUser } from "@/types/user";
import { ROLES } from "@/utils";
import { useAuth } from "@/hooks";

interface Props {
  user: TopicUser;
}

export const UserDetails = ({ user }: Props) => {
  const { role } = useAuth();

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
            <h3 className="text-center mt-[-.5rem] text-sm text-gray-500">
              {user.userInformation && user.userInformation.phoneNumber}
            </h3>
            <div className="w-full flex gap-1 flex-wrap justify-center">
              {user.user.roles.map((role) => (
                <Chip
                  key={role}
                  color="primary"
                  radius="sm"
                  variant="flat"
                  size="sm"
                >
                  {roleNames[role as keyof typeof roleNames]}
                </Chip>
              ))}
            </div>
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
      
      {(role === ROLES.ADMIN ||
        role === ROLES.SUBJECT_HOLDER) && (
          <section className="grid gap-2">
            <CardInfo
              title="Agrega o quita un programa educativo a este usuario"
              description="En caso de que un usuario pertenezca o deje de pertenecer a un programa educativo, puedes agregarlo o quitarlo de la lista de programas educativos."
              color="warning"
            />
            <EditDegrees user={user} />
          </section>
        )}
    </article>
  );
};
