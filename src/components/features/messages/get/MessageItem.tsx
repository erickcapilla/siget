import { User, Badge } from "@nextui-org/react";
import { LayoutItem } from "@/components/layouts";

export const MessageItem = () => {
  return (
    <LayoutItem className="flex justify-between border-l-success border-l-5 text-black h-20 w-full p-2 bg-gray-100 rounded-md">
      <section className="flex items-center">
        <User
          name="Erick Capilla"
          description="Mensaje de este chat"
          avatarProps={{
            showFallback: true,
            size: "md",
          }}
          classNames={{
            description: "text-gray-500",
          }}
        />
      </section>
      <section className="grid place-items-center">
        <div className="text-xs text-gray-500">12/02/2024</div>
        <div className="flex justify-end w-full pr-3">
          <Badge
            showOutline={false}
            size="sm"
            content="2"
            shape="circle"
            color="success"
            className="text-white text-xs font-bold mt-3"
          >
            .
          </Badge>
        </div>
      </section>
    </LayoutItem>
  );
};
