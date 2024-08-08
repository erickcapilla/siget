import { Spinner } from "@nextui-org/react";
import { DegreeList, EditDegreeForm } from "@/components/features";
import { useState, useEffect } from "react";
import { DegreeResponse } from "@/types/admin";
import degreeServices from "@/services/DegreeServices";
import toast from "react-hot-toast";

export const DegreesAdmin = () => {
  const [degrees, setDegrees] = useState<DegreeResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [degree, setDegree] = useState<DegreeResponse>({} as DegreeResponse);

  useEffect(() => {
    setIsLoading(true);
    degreeServices
      .getDegrees()
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
      ) : degrees.length > 0 ? (
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
