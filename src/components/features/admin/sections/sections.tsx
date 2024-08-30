import { DegreesAdmin, GraduationsAdmin } from "@/components/features";
import { Divider } from "@nextui-org/react";
import { DegreeResponse, GraduationResponse } from "@/types/admin";

interface Props {
  setDegrees: React.Dispatch<React.SetStateAction<DegreeResponse[]>>;
  degrees: DegreeResponse[];
  setGraduations: React.Dispatch<React.SetStateAction<GraduationResponse[]>>;
  graduations: GraduationResponse[];
}

export const AdminSection = ({setDegrees, degrees, setGraduations, graduations}: Props) => {
  return (
    <section className="grid gap-5">
      <DegreesAdmin setDegrees={setDegrees} degrees={degrees} />
      <Divider />
      <GraduationsAdmin setGraduations={setGraduations} graduations={graduations} />
    </section>
  )
}