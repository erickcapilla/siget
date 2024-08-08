import {
  Navbar as NavbarUI,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
  Tooltip,
} from "@nextui-org/react";
import { LogoutOutline } from "@/components/icons";
import { menuItems } from "@/data/menu";
import { useAuth } from "@/hooks/useAuth";

export const Navbar = () => {
  const { logout } = useAuth();

  const itemActive = (href: string) => {
    return window.location.pathname.toString() === href;
  };

  return (
    <NavbarUI
      className="h-full bg-transparent"
      classNames={{
        wrapper: "h-full flex flex-col justify-between",
      }}
    >
      <NavbarContent className="flex flex-col overflow-y-auto h-full">
        {menuItems.map((item) => (
          <NavbarItem key={item.id}>
            <Tooltip content={item.name} color="primary">
              <Link href={item.path}>
                {itemActive(item.path) ? (
                  <item.iconActive />
                ) : (
                  <item.icon />
                )}
              </Link>
            </Tooltip>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent className="flex items-end max-h-10 px-5">
        <NavbarItem>
          <Tooltip content="Cerrar sesión" color="primary">
            <Button
              isIconOnly
              color="primary"
              radius="sm"
              onPress={logout}
            >
              <LogoutOutline />
            </Button>
          </Tooltip>
        </NavbarItem>
      </NavbarContent>
    </NavbarUI>
  );
};
