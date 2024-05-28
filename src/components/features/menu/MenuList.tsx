import { menuItems } from "@/data/menu";
import { MenuItem } from "./MenuItem";
import { Select, SelectItem } from "@nextui-org/react";
import { useUser } from "@/hooks";
import { roleNames } from "@/utils/utils";

export const MenuList = () => {
  const { setRole, userRoles, role } = useUser();

  return (
    <div className="grid gap-2">
      <Select
        label="Roles"
        placeholder={roleNames[role as keyof typeof roleNames]}
        className="max-w-xs" 
        color="secondary"
        variant="underlined"
        onChange={(e) => {
          localStorage.setItem("role", e?.target.value);
          setRole(e?.target.value || "")
        }}
        classNames={{
          base: "text-black",
        }}
      >
        {userRoles.map((role) => (
          <SelectItem key={role} value={role}>
            { roleNames[role as keyof typeof roleNames] }
          </SelectItem>
        ))}
      </Select>
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};
