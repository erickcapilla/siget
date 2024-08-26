import { Radio, RadioGroup } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { optionNames } from "@/utils/utils";
import graduationsServices from "@/services/GraduationsOptionsServices";
import { GraduationResponse } from "@/types/admin";
import { useAuth } from "@/hooks";
 
interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const GraduationsSelect = ({ onChange }: Props) => {
  const [options, setOptions] = useState<GraduationResponse[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    graduationsServices
      .getOptions(token)
      .then((response) => response.json())
      .then((data) => setOptions(data))
      .catch((error) => console.error(error))
  }, []);

  return (
    <RadioGroup
      name="graduationOption"
      label="Selecciona tipo de documento"
      orientation="horizontal"
      className="text-sm"
      isRequired
      onChange={onChange}
    >
      {options.map((option) => (
        <Radio
          key={option.id}
          value={option.id}
          classNames={{ label: "text-sm" }}
        >
          {optionNames[option.name as keyof typeof optionNames]}
        </Radio>
      ))}
    </RadioGroup>
  );
};
