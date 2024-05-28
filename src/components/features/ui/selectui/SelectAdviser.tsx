import {Select, SelectItem, Avatar, Chip, SelectedItems} from "@nextui-org/react";
import { users } from "@data/users";

type User = {
  id: number;
  name: string;
  role: string;
  team: string;
  status: string;
  age: string;
  avatar: string;
  email: string;
};

interface Props {
  onChange?: (e?: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectAdviser = ({ onChange }: Props) => {
  return (
    <Select
      items={users}
      label="Asesores"
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Selecciona asesores"
      labelPlacement="outside"
      classNames={{
        base: "max-w-xs",
        trigger: "min-h-12 py-2",
      }}
      renderValue={(items: SelectedItems<User>) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key} color="primary" variant="flat">{item.data?.name}</Chip>
            ))}
          </div>
        );
      }}
      onChange={onChange}
      color="primary"
      radius="sm"
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
              <span className="text-tiny text-default-400">{user.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
