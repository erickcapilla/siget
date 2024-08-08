import { Select, SelectItem } from "@nextui-org/react";
import { useUser } from "@/hooks";
import { roleNames } from "@/utils/utils";
import { MenuList } from "./MenuList";

export const Menu = () => {
  const { setRole, userRoles, role } = useUser();

  return (
    <div className="h-full flex flex-col gap-2 justify-between">
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
        {userRoles.map((role) => (
          <SelectItem key={role} value={role}>
            {roleNames[role as keyof typeof roleNames]}
          </SelectItem>
        ))}
      </Select>
      <div className="grid gap-2 pb-2">
        <MenuList />
      </div>
    </div>
  );
};
