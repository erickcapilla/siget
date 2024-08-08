import { Input, Button } from "@nextui-org/react";
import { useUser } from "@/hooks";
import { useState } from "react";
import userServices from "@/services/UserServices";
import { Information } from "@/types";

export const PersonalForm = () => {
  const { information, setInformation } = useUser();
  const [values, setValues] = useState<Information>({
    name: "",
    fatherLastName: "",
    motherLastName: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<EventTarget> | React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await userServices.setInformation(values);
      setInformation(await res.json());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col gap-3 justify-between h-full w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <Input
          name="name"
          label="Nombre(s)"
          placeholder="Ingresa tu nombre(s)"
          color="primary"
          isRequired
          variant="bordered"
          value={information?.name}
          onChange={handleChange}
        />
        <Input
          name="fatherLastName"
          label="Apellido paterno"
          placeholder="Ingresa tu apellido paterno"
          color="primary"
          isRequired
          variant="bordered"
          value={information?.fatherLastName}
          onChange={handleChange}
        />
        <Input
          name="motherLastName"
          label="Apellido materno"
          placeholder="Ingresa tu apellido materno"
          color="primary"
          isRequired
          variant="bordered"
          value={information?.motherLastName}
          onChange={handleChange}
        />
        <Input
          name="address"
          label="Dirección"
          placeholder="Ingresa tu dirección"
          color="primary"
          isRequired
          variant="bordered"
          value={information?.address}
          onChange={handleChange}
        />
        <Input
          name="phoneNumber"
          label="Teléfono"
          placeholder="Ingresa tu teléfono"
          color="primary"
          isRequired
          variant="bordered"
          value={information?.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="w-full">
        <Button type="submit" color="primary" variant="solid" radius="sm" className="w-full">
          Guardar
        </Button>
      </div>
    </form>
  );
};
