import { LayoutItem } from "@/layouts";
import { MenuItems } from "@/data/menu";
import { Link } from "@nextui-org/react";

interface Props {
  item: MenuItems;
  func?: () => void;
}

export const MenuItem = ({ item, func }: Props) => {
  const itemActive = (href: string) => {
    return window.location.pathname.toString() === href;
  };

  return (
    <Link href={item.path} onPress={func}>
      <LayoutItem
        className={`border-l-primary ${
          itemActive(item.path) && "bg-warning-100"
        } ${item.id === "logout" && "border-l-danger-500"}`}
      >
        <strong className="text-sm"> {item.name} </strong>
      </LayoutItem>
    </Link>
  );
};
