import { Input, Button } from "@nextui-org/react";
import { useAuth } from "@/hooks";
import { useState } from "react";
import userServices from "@/services/UserServices";
import { Information } from "@/types";
import toast from "react-hot-toast";

export const PersonalForm = () => {
  const { token, user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState<Information>({
    name: user?.userInformation?.name,
    fatherLastName: user?.userInformation?.fatherLastName,
    motherLastName: user?.userInformation?.motherLastName,
    address: user?.userInformation?.address,
    phoneNumber: user?.userInformation?.phoneNumber,
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
    setLoading(true);
    if (user?.userInformation) {
      try {
        const res = await userServices.updateInformation(token, values);
        const data = await res.json();

        console.log(data);
        setUser({ ...user, userInformation: data });
        toast.success("Información actualizada");
      } catch (error) {
        console.error(error);
        toast.error("Error al actualizar la información");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await userServices.setInformation(token, values);
        const data = await res.json();

        console.log(data);
        setUser({ ...user, userInformation: data });
        toast.success("Información agregada");
      } catch (error) {
        console.error(error);
        toast.error("Error al agregar la información");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-3 justify-between h-full w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <Input
          name="name"
          label="Nombre(s)"
          placeholder="Ingresa tu nombre(s)"
          color="primary"
          isRequired
          variant="bordered"
          value={values.name}
          onChange={handleChange}
          radius="sm"
        />
        <Input
          name="fatherLastName"
          label="Apellido paterno"
          placeholder="Ingresa tu apellido paterno"
          color="primary"
          isRequired
          variant="bordered"
          value={values.fatherLastName}
          onChange={handleChange}
          radius="sm"
        />
        <Input
          name="motherLastName"
          label="Apellido materno"
          placeholder="Ingresa tu apellido materno"
          color="primary"
          isRequired
          variant="bordered"
          value={values.motherLastName}
          onChange={handleChange}
          radius="sm"
        />
        <Input
          name="address"
          label="Dirección"
          placeholder="Ingresa tu dirección"
          color="primary"
          isRequired
          variant="bordered"
          value={values.address}
          onChange={handleChange}
          radius="sm"
        />
        <Input
          name="phoneNumber"
          label="Teléfono"
          placeholder="Ingresa tu teléfono"
          color="primary"
          isRequired
          variant="bordered"
          value={values.phoneNumber}
          onChange={handleChange}
          radius="sm"
        />
      </div>
      <div className="w-full">
        <Button
          type="submit"
          color="primary"
          variant="solid"
          radius="sm"
          className="w-full"
          isLoading={loading}
        >
          {user?.userInformation ? "Actualizar" : "Agregar"}
          {loading && "..."}
        </Button>
      </div>
    </form>
  );
};
