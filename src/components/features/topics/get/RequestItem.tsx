import { LayoutItem } from "@/components/layouts";
import { RequestTopic } from "@/types";
import { Chip } from "@nextui-org/react";

interface Props {
  request: RequestTopic;
}

export const RequestItem = ({ request }: Props) => {
  return (
    <LayoutItem className="border-primary flex items-center">
      <section className="grid gap-3 w-full">
        <h3 className="text-primary font-bold">{request.topic.title}</h3>
        <p className="text-sm">{request.topic.description}</p>
      </section>
      <section>
        <Chip color={request.isAccepted ? "success" : "danger"} variant="flat">
          {" "}
          {request.isAccepted ? "Aceptado" : "Rechazado"}{" "}
        </Chip>
      </section>
    </LayoutItem>
  );
};
