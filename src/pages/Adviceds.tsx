import { LayoutMain } from "@/layouts";
import { AdvicedsTable, Panel } from "@/components/features";

export const Adviceds = () => {
  return (
    <LayoutMain>
      <Panel title="Asesorados">
        <AdvicedsTable />
      </Panel>
    </LayoutMain>
  );
};
