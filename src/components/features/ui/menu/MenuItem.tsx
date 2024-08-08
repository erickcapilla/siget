import { LayoutItem } from "@/layouts";
import { MenuItems } from "@/data/menu";
import { Link } from "@nextui-org/react";

interface Props {
  item: MenuItems;
  func?: () => void;
}

export const MenuItem = ({ item, func }: Props) => {
  const topicID = "b055a2b8-f69c-4cf0-81b2-48f86389f431";

  const itemActive = (href: string) => {
    return window.location.pathname.toString() === href;
  };

  return (
    <Link
      href={
        item.path.includes("document") ? `${item.path}/${topicID}` : item.path
      }
      onPress={func}
    >
      <LayoutItem
        className={`border-l-primary ${
          itemActive(item.path) && "bg-warning-100"
        } ${func && "bg-danger-100"}`}
      >
        <strong className="text-sm"> {item.name} </strong>
      </LayoutItem>
    </Link>
  );
};
