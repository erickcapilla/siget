import { DegreeItem } from "./item";
import { DegreeResponse } from "@/types/admin";

interface Props {
  setDegrees: React.Dispatch<React.SetStateAction<DegreeResponse[]>>;
  setDegree: React.Dispatch<React.SetStateAction<DegreeResponse>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  degrees: DegreeResponse[];
}

export const DegreeList = ({ setDegrees, setDegree, setIsEditing, degrees }: Props) => {
  return (
    <>
      {degrees.map((degree) => (
        <DegreeItem
          key={degree.id}
          setDegrees={setDegrees}
          setDegree={setDegree}
          setIsEditing={setIsEditing}
          degree={degree}
        />
      ))}
    </>
  );
};
