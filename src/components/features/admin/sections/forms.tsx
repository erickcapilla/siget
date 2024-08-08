import { Divider } from "@nextui-org/react";
import { DegreeForm, GraduationForm } from "@/components/features";

export const AdminForms = () => {
  return (
    <div className="grid gap-5">
      <div>
        <h3 className="text-primary font-semibold mb-3">
          Agregar programas educativos
        </h3>
        <DegreeForm />
      </div>
      <Divider />
      <div>
        <h3 className="text-primary font-semibold mb-3">
          Agregar opciones de graduación
        </h3>
        <GraduationForm />
      </div>
    </div>
  );
};
