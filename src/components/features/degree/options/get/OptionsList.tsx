import { OptionsDegree } from "@/data/options";
import { OptionItem } from "./OptionItem"

export const OptionsList = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {OptionsDegree.map((option) => (
        <OptionItem key={option.id} {...option} />
      ))}
    </div>
  );
}