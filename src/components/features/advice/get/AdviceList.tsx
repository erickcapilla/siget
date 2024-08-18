import { AdviceItem } from "./AdviceItem";
import { AdvisoryResponse } from "@/types/advisory";

interface Props {
  advisories: AdvisoryResponse[];
  setAdvisories: React.Dispatch<React.SetStateAction<AdvisoryResponse[]>>;
}

export const AdviceList = ({ advisories, setAdvisories }: Props) => {
  return (
    <div className="grid gap-3">
      {advisories.map((advisory: AdvisoryResponse) => (
        <AdviceItem key={advisory.id} advisory={advisory} setAdvisories={setAdvisories} />
      ))}
    </div>
  )
}