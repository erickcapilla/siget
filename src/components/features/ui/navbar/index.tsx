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
import { useAuth } from "@/hooks";
import toast from "react-hot-toast";

export const Navbar = () => {
  const { logout, roles } = useAuth();
  const items = menuItems.filter((item) => roles.some((r) => item.roles.includes(r)));
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
        {items.map((item) => (
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
              onPress={() => {
                toast((t) => (
                  <span>
                    ¿Estás seguro de cerrar sesión?
                    <Button
                      color="danger"
                      size="sm"
                      variant="flat"
                      className="m-2"
                      onPress={() => {
                        logout();
                        toast.dismiss(t.id);
                      }}
                    >
                      Cerrar sesión
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      className="m-2"
                      onPress={() => {
                        toast.dismiss(t.id);
                      }}
                    >
                      Cancelar
                    </Button>
                  </span>
                ));
              }}
            >
              <LogoutOutline />
            </Button>
          </Tooltip>
        </NavbarItem>
      </NavbarContent>
    </NavbarUI>
  );
};
