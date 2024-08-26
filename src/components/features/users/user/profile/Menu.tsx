import {
  Avatar,
  AvatarIcon,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { useAuth } from "@/hooks";
import { roleNames } from "@/utils/utils";
import { LayoutItem } from "@/layouts";

interface Props {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}

export const MenuInformation = ({ setMenu }: Props) => {
  const { role, setRole, user } = useAuth();

  return (
    <article className="flex flex-col items-center gap-10 w-full h-full">
      <section className="w-full">
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
            placeholder={roleNames[role as keyof typeof roleNames]}
            color="secondary"
            variant="underlined"
            onChange={(e) => {
              localStorage.setItem("siget-role", e?.target.value);
              setRole(e?.target.value || "");
            }}
            classNames={{
              base: "text-black",
            }}
          >
            {user.user.roles.map((role) => (
              <SelectItem key={role} value={role}>
                {roleNames[role as keyof typeof roleNames]}
              </SelectItem>
            ))}
          </Select>
        </div>
      </section>
      <section className="flex flex-col gap-3 w-full">
        <Button className="p-0" onPress={() => setMenu("personal")}>
          <LayoutItem className="border-primary h-full">
            Información personal
          </LayoutItem>
        </Button>
        <Button className="p-0" onPress={() => setMenu("student")}>
          <LayoutItem className="border-primary h-full">
            Información estudiantil
          </LayoutItem>
        </Button>
      </section>
    </article>
  );
};
