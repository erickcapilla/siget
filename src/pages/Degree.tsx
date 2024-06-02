import { LayoutMain } from "@components/layouts";
import { Panel, OptionsList  } from "@/components/features";

//<DegreeProgressBar /> DegreeProgressBar
export const Degree = () => {
  return (
    <LayoutMain>
      <Panel title="Titulación" className="px-5">
        <OptionsList />
      </Panel>
    </LayoutMain>
  );
};
