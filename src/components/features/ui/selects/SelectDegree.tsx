import { Select, SelectItem, Chip, SelectedItems } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Degree } from "@/types/user";
import degreeServices from "@/services/DegreeServices";
import { useAuth } from "@/hooks";

interface Props {
  onChange?: (e?: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectDegree = ({ onChange }: Props) => {
  const [data, setData] = useState<Degree[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    degreeServices.getDegrees(token)
      .then((response) => response.json())
      .then((data) => setData(data))
      .then(() => {
        const degree = data.map((degree) => {
          const name = degree.name.normalize('NFD')
          return {
            id: degree.id,
            name:
              name.charAt(0).toUpperCase() +
              name.slice(1).replace(/-/g, " "),
          };
        });
        setDegrees(degree);
      })
  }, [data]);

  return (
    <Select
      isRequired
      items={degrees}
      label="Programas educativos"
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Selecciona los programas educativos"
      radius="sm"
      color="primary"
      classNames={{
        popoverContent: "border-element",
        trigger: "min-h-unit-12 py-2",
        label: "text-primary pb-3",
        base: "text-black",
      }}
      renderValue={(items: SelectedItems<Degree>) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key} color="primary" variant="flat">
                {item.data?.name}
              </Chip>
            ))}
          </div>
        );
      }}
      onChange={onChange}
    >
      {(degree) => (
        <SelectItem key={degree.id} textValue={degree.name}>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <span className="text-small">{degree.name}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};
