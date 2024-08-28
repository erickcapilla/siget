import { Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import userServices from "@/services/UserServices";
import { useAuth } from "@/hooks/useAuth";
import { SelectDegree } from "@/components/features";
import { TopicUser } from "@/types/user";

interface Props {
  user: TopicUser;
}

export const EditDegreesForm = ({ user }: Props) => {
  const [degrees, setDegrees] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = (e: React.FormEvent<EventTarget | HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    userServices
      .setDegrees(token, user.user.id, degrees)
      .then(() => toast.success("Programa(s) educativo(s) actualizado(s)"))
      .catch((error) => toast.error(error.toString()))
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      className="flex flex-col gap-3 h-full"
      onSubmit={handleSubmit}
    >
      <SelectDegree
        onChange={(e) => {
          const degree = e?.target.value;
          const degrees = degree ? degree.split(",") : [];
          setDegrees([...degrees]);
        }}
      />
      <Button
        className="w-full"
        isLoading={isLoading}
        color="primary"
        variant="solid"
        type="submit"
        radius="sm"
      >
        Agregar
      </Button>
    </form>
  );
};
