import { LayoutItem } from "@/layouts";
import { RequestTopic } from "@/types";
import { Chip } from "@nextui-org/react";

interface Props {
  request: RequestTopic;
}

export const RequestItem = ({ request }: Props) => {
  return (
    <LayoutItem className="border-primary flex items-end flex-col gap-3">
      <section className="grid gap-3 w-full">
        <h3 className="text-primary font-bold">{request.topic.title}</h3>
        <p className="text-sm">{request.topic.description}</p>
      </section>
      <section className="w-full flex justify-end">
        <Chip color={request.isAccepted ? "success" : "warning"} variant="flat">
          {" "}
          {request.isAccepted ? "Aceptado" : "En espera"}{" "}
        </Chip>
      </section>
    </LayoutItem>
  );
};
