import { Divider } from "@nextui-org/react";
import { DegreeForm, GraduationForm } from "@/components/features";
import { DegreeResponse, GraduationResponse } from "@/types/admin";

interface Props {
  setDegrees: React.Dispatch<React.SetStateAction<DegreeResponse[]>>;
  setGraduations: React.Dispatch<React.SetStateAction<GraduationResponse[]>>;
}

export const AdminForms = ({setDegrees, setGraduations}: Props) => {
  return (
    <div className="grid gap-5">
      <div>
        <h3 className="text-primary font-semibold mb-3">
          Agregar programas educativos
        </h3>
        <DegreeForm setDegrees={setDegrees} />
      </div>
      <Divider />
      <div>
        <h3 className="text-primary font-semibold mb-3">
          Agregar opciones de graduación
        </h3>
        <GraduationForm setGraduations={setGraduations} />
      </div>
    </div>
  );
};
