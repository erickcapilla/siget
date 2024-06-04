import { AdviceItem } from "./AdviceItem";

interface Props {
  advisories: [];
  setAdvisories: React.Dispatch<React.SetStateAction<any[]>>;
}

export const AdviceList = ({ advisories, setAdvisories }: Props) => {
  return (
    <div className="grid gap-3">
      {advisories.map((advisory: any) => (
        <AdviceItem key={advisory.id} advisory={advisory} setAdvisories={setAdvisories} />
      ))}
    </div>
  )
}