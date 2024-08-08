import { GraduationItem } from "./item";
import { GraduationResponse } from "@/types/admin";

interface Props {
  setGraduations: React.Dispatch<React.SetStateAction<GraduationResponse[]>>;
  graduations: GraduationResponse[];
}

export const GraduationList = ({ setGraduations, graduations }: Props) => {
  return (
    <>
      {graduations.map((graduation) => (
        <GraduationItem
          key={graduation.id}
          setGraduations={setGraduations}
          graduation={graduation}
        />
      ))}
    </>
  );
};
