import { Select, SelectItem, Chip, SelectedItems } from "@nextui-org/react";
import { roles } from "@data/roles";
import { Rol } from "@/types/user"

interface Props {
  onChange?: (e?: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectRole = ({ onChange }: Props)  => {
  return (
    <Select
      isRequired
      items={roles as Iterable<Rol>}
      label="Roles"
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
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
              <Chip key={item.key} color="primary" variant="flat">{item.data?.role}</Chip>
            ))}
          </div>
        );
      }}
      onChange={onChange}
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
}
