import { Select, SelectItem, Chip, SelectedItems } from "@nextui-org/react";
import { roles } from "@data/roles";
import { Rol } from "@/types/user";
import { useState } from "react";
import { ROLES } from "@/utils";
import { useAuth } from "@/hooks";

interface Props {
  onChange?: (e?: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectRole = ({ onChange }: Props) => {
  const [isStudent, setIsStudent] = useState(false);
  const { role } = useAuth();

  return (
    <Select
      isRequired
      items={
        isStudent || role === ROLES.SUBJECT_HOLDER
          ? roles.filter((role) => role.value === "STUDENT_ROLE")
          : roles
      }
      label="Roles"
      variant="bordered"
      isMultiline={true}
      selectionMode={isStudent ? "single" : "multiple"}
      placeholder="Selecciona los roles"
      radius="sm"
      color="primary"
      classNames={{
        popoverContent: "border-element",
        trigger: "min-h-unit-12 py-2",
        label: "text-primary pb-3",
        base: "text-black",
      }}
      renderValue={(items: SelectedItems<Rol>) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key} color="primary" variant="flat">
                {item.data?.role}
              </Chip>
            ))}
          </div>
        );
      }}
      onChange={(e) => {
        if (e.target.value.includes("STUDENT_ROLE")) {
          e.target.value = "STUDENT_ROLE";
          setIsStudent(true);
        } else {
          setIsStudent(false);
        }

        onChange(e);
      }}
    >
      {(user) => (
        <SelectItem key={user.value} textValue={user.role}>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <span className="text-small">{user.role}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};
