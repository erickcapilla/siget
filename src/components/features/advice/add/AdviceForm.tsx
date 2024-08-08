import { Input, Button, DateInput, Textarea } from "@nextui-org/react";
import { Advisory } from "@/types";
import { useState } from 'react'
import advisoryServices from "@/services/AdvisoryServices";

interface Props {
  setAdvisories: React.Dispatch<React.SetStateAction<any[]>>;
}

export const AdviceForm = ({setAdvisories}: Props) => {
  const [advisory, setAdvisory] = useState<Advisory>({
    reviewedTopic: "",
    observations: "",
    date: "",
    acceptedTopic: "b055a2b8-f69c-4cf0-81b2-48f86389f431",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAdvisory({ ...advisory, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(advisory)
    advisoryServices.saveAdvisory(advisory)
      .then(() => setAdvisories(prev => [...prev, {id: 0, ...advisory}]))
      .then(() => console.log("Nueva asesoria"))
      .catch((error) => console.error(error))
  }
  return (
    <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
      <div className="grid gap-3">
      <Input
        name="reviewedTopic"
        isRequired
        label="Tema revisado"
        placeholder="Ingresa el tema revisado"
        color="primary"
        variant="bordered"
        radius="sm"
        onChange={handleChange}
      />
      <Textarea
        name="observations"
        isRequired
        label="Observaciones"
        placeholder="Ingresa las observaciones"
        color="primary"
        variant="bordered"
        radius="sm"
        onChange={handleChange}
      />
      <DateInput
        name="date"
        isRequired
        label="Fecha de revisión"
        color="primary"
        variant="bordered"
        radius="sm"
        onChange={(e) => {
          setAdvisory({ ...advisory, date: `${e.day}/${e.month}/${e.year}` });
        }}
      />
      </div>
      <div>
        <Button type="submit" color="primary" variant="solid" radius="sm" className="w-full">Agregar</Button>
      </div>
    </form>
  );
};
