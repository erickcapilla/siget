import { Spinner } from "@nextui-org/react";
import { DegreeList, EditDegreeForm } from "@/components/features";
import { useState, useEffect } from "react";
import { DegreeResponse } from "@/types/admin";
import degreeServices from "@/services/DegreeServices";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks";

interface Props {
  setDegrees: React.Dispatch<React.SetStateAction<DegreeResponse[]>>;
  degrees: DegreeResponse[];
}

export const DegreesAdmin = ({setDegrees, degrees}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [degree, setDegree] = useState<DegreeResponse>({} as DegreeResponse);
  const { token } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    degreeServices
      .getDegrees(token)
      .then((res) => res.json())
      .then((data) => setDegrees(data))
      .catch((error) => toast.error(error.toString()))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section>
      <h3 className="text-primary font-semibold">Programas educativos</h3>

      <div className="my-5">
        {isEditing && (
          <EditDegreeForm
            degree={degree}
            setDegrees={setDegrees}
            setIsEditing={setIsEditing}
          />
        )}
      </div>

      {isLoading ? (
        <Spinner />
      ) : degrees?.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          <DegreeList
            setDegrees={setDegrees}
            setDegree={setDegree}
            setIsEditing={setIsEditing}
            degrees={degrees}
          />
        </div>
      ) : (
        <p>No hay programas educativos</p>
      )}
    </section>
  );
};
