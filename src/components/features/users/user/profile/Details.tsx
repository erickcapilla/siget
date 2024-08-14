import {
  Avatar,
  AvatarIcon,
  Select,
  SelectItem,
  Input,
  Chip,
} from "@nextui-org/react";
import { roleNames } from "@/utils/utils";
import { useEffect, useState } from "react";
import userServices from "@/services/UserServices";
import { UserResponse } from "@/types";

interface Props {
  id: string;
}

export const Details = ({ id }: Props) => {
  const [user, setUser] = useState<UserResponse>();

  useEffect(() => {
    userServices
      .getUser(id)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <article className="flex flex-col items-center gap-10 w-full h-full">
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
            <Input
              label="Número de teléfono"
              value={
                user.userInformation ? user.userInformation.phoneNumber : ""
              }
              variant="underlined"
              color="secondary"
              classNames={{
                base: "text-black",
              }}
              isReadOnly
            />
            <div className="grid gap-3">
              <h3 className="text-black text-sm">Programas académicos</h3>
              {user.userInformation &&
                user.userDegreePrograms.map((degree) => (
                  <Chip
                    key={degree.id}
                    color="secondary"
                    variant="bordered"
                    className="text-black"
                  >
                    {degree.name.charAt(0).toUpperCase() +
                      degree.name.slice(1).replace(/-/g, " ")}
                  </Chip>
                ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};
