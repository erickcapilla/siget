import { LayoutItem } from "@/components/layouts";
import { MenuItems } from "@/data/menu";
import { Link } from "@nextui-org/react";

interface Props {
  item: MenuItems; 
}

export const MenuItem = ({ item }: Props) => {
  return (
    <Link href={item.path}>
      <LayoutItem className="border-l-primary">
        <strong className="text-sm"> { item.name } </strong>
      </LayoutItem>
    </Link>
  )
}