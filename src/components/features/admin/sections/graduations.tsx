import { Spinner } from "@nextui-org/react";
import { GraduationList } from "@/components/features";
import { useState, useEffect } from "react";
import { GraduationResponse } from "@/types/admin";
import graduationsServices from "@/services/GraduationsOptionsServices";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks";

export const GraduationsAdmin = () => {
  const [graduations, setGraduations] = useState<GraduationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    graduationsServices
      .getOptions(token)
      .then((res) => res.json())
      .then((data) => setGraduations(data))
      .catch((error) => toast.error(error.toString()))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section>
      <h3 className="text-primary font-semibold mb-5">Opciones de titulación</h3>

      {isLoading ? (
        <Spinner />
      ) : graduations.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          <GraduationList setGraduations={setGraduations} graduations={graduations}/>
        </div>
      ) : (
        <p>No hay programas educativos</p>
      )}
    </section>
  );
};
