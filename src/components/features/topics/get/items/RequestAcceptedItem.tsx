import { LayoutItem } from "@/layouts";
import { TopicAccepted } from "@/types";
import { Chip } from "@nextui-org/react";

interface Props {
  request: TopicAccepted;
}

export const RequestAcceptedItem = ({ request }: Props) => {
  return (
    <LayoutItem className="border-primary flex items-center">
      <section className="grid gap-3 w-full">
        <h3 className="text-primary font-bold">{request.title}</h3>
        <p className="text-sm">{request.description}</p>
      </section>
      <section>
        <Chip color="success" variant="flat">
          Aceptado
        </Chip>
      </section>
    </LayoutItem>
  );
};