import { LayoutItem } from "@/components/layouts";
import { MenuItems } from "@/data/menu";
import { Link } from "@nextui-org/react";
import { useTopic } from "@/hooks";

interface Props {
  item: MenuItems;
}

export const MenuItem = ({ item }: Props) => {
  const { userRequestsAccepted } = useTopic();
  const topicID = userRequestsAccepted && userRequestsAccepted.items.length > 0 ? userRequestsAccepted.items[0].id : "b055a2b8-f69c-4cf0-81b2-48f86389f431";

  return (
    <Link
      href={
        item.path.includes("document")
          ? `${item.path}/${topicID}`
          : item.path
      }
    >
      <LayoutItem className="border-l-primary">
        <strong className="text-sm"> {item.name} </strong>
      </LayoutItem>
    </Link>
  );
};
