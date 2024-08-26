import { Select, SelectItem } from "@nextui-org/react";
import { useAuth } from "@/hooks";

interface Props {
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export const DegreesUserSelect = ({ onChange }: Props) => {
  const { user } = useAuth();

  return (
    <Select
      name="degreeProgram"
      label="Programa académico"
      placeholder="Selecciona tu programa académico"
      color="primary"
      variant="bordered"
      classNames={{
        base: "text-black",
      }}
      className="mt-[-.5rem]"
      isRequired
      onChange={onChange}
      radius="sm"
    >
      {user.userDegreePrograms.map((degree) => (
        <SelectItem key={degree.id} value={degree.id}>
          {degree.name.charAt(0).toUpperCase() +
            degree.name.slice(1).replace(/-/g, " ")}
        </SelectItem>
      ))}
    </Select>
  );
};
