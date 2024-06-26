import {
  Avatar,
  AvatarIcon,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { useUser } from "@/hooks";
import { roleNames } from "@/utils/utils";
import { LayoutItem } from "@/components/layouts";

interface Props {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}

export const Menu = ({ setMenu }: Props) => {
  const { information, userRoles, role, setRole, user } = useUser();

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
            {information &&
              `${information.name} ${information.fatherLastName} ${information.motherLastName}`}
          </h3>
          <h3 className="text-center mt-[-.5rem] text-sm text-gray-500">
            {information && user.email}
          </h3>
          <Select
            label="Roles"
            placeholder={roleNames[role as keyof typeof roleNames]}
            color="secondary"
            variant="underlined"
            onChange={(e) => {
              localStorage.setItem("role", e?.target.value);
              setRole(e?.target.value || "");
            }}
            classNames={{
              base: "text-black",
            }}
          >
            {userRoles.map((role) => (
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
