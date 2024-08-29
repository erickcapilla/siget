import { Select, SelectItem } from "@nextui-org/react";
import { useAuth } from "@/hooks";
import { roleNames } from "@/utils/utils";
import { MenuList } from "./MenuList";
import { useNavigate } from "react-router-dom";
import { paths } from "@/utils";

export const Menu = () => {
  const { setRole, user, role } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col gap-3">
      <Select
        label="Roles"
        placeholder={roleNames[role as keyof typeof roleNames]}
        color="secondary"
        variant="underlined"
        onChange={(e) => {
          localStorage.setItem("siget-role", e?.target.value);
          setRole(e?.target.value);
          navigate(paths.home)
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
      <div className="grid gap-2 pb-2">
        <MenuList />
      </div>
    </div>
  );
};
