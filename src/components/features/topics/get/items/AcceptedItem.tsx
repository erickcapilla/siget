import { LayoutItem } from "@/layouts";
import { AcceptedTopic } from "@/types/topic";
import { Chip } from "@nextui-org/react";

interface Props {
  accepted: AcceptedTopic;
}

export const AcceptedItem = ({ accepted }: Props) => {
  return (
    <LayoutItem className="border-primary flex items-center">
      <section className="grid gap-3 w-full">
        <h3 className="text-primary font-bold">{accepted.title}</h3>
        <p className="text-sm">{accepted.description}</p>
      </section>
      <section>
        <Chip color="success" variant="flat">
          Aceptado
        </Chip>
      </section>
    </LayoutItem>
  );
};