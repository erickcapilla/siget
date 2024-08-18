import { Input, Button, DateInput, Textarea } from "@nextui-org/react";
import { AdvisoryData, AdvisoryResponse } from "@/types/advisory";
import { useState } from "react";
import advisoryServices from "@/services/AdvisoryServices";
import { useAuth } from "@/hooks";
import toast from "react-hot-toast";
import { parseDate } from "@internationalized/date";

interface Props {
  setAdvisories: React.Dispatch<React.SetStateAction<AdvisoryResponse[]>>;
  id: string;
}

export const AdviceForm = ({ setAdvisories, id }: Props) => {
  const { token } = useAuth();
  const [advisory, setAdvisory] = useState<AdvisoryData>({
    acceptedTopic: id,
  } as AdvisoryData);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAdvisory({ ...advisory, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    advisoryServices
      .saveAdvisory(token, advisory)
      .then((res) => res.json())
      .then((data) => setAdvisories((prev) => [...prev, data]))
      .then(() => {
        toast.success("Nueva asesoria")
        setAdvisory({
          reviewedTopic: "",
          observations: "",
          date: advisory.date,
          acceptedTopic: id,
        });
      })
      .catch((error) => toast.error(error.toString()))
      .finally(() => setLoading(false));
  };
  return (
    <form
      className="flex flex-col justify-between h-full"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3">
        <Input
          name="reviewedTopic"
          isRequired
          label="Tema revisado"
          placeholder="Ingresa el tema revisado"
          color="primary"
          variant="bordered"
          radius="sm"
          value={advisory.reviewedTopic}
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
          value={advisory.observations}
          onChange={handleChange}
        />
        <DateInput
          name="date"
          isRequired
          label="Fecha de revisión"
          color="primary"
          variant="bordered"
          radius="sm"
          defaultValue={parseDate(new Date().toISOString().split('T')[0])}
          onChange={(e) => {
            setAdvisory({ ...advisory, date: `${e.month}/${e.day}/${e.year}` });
          }}
        />
      </div>
      <div>
        <Button
          type="submit"
          color="primary"
          variant="solid"
          radius="sm"
          className="w-full"
          isLoading={loading}
        >
          {loading ? "Agregando" : "Agregar"}
        </Button>
      </div>
    </form>
  );
};
