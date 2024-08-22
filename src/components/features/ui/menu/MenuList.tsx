import { menuItems } from "@/data/menu";
import { MenuItem } from "./MenuItem";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@nextui-org/react";
import { LayoutItem } from "@/layouts";
import toast from "react-hot-toast";

export const MenuList = () => {
  const { logout } = useAuth();

  return (
    <>
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
      <Button
        className="p-0 bg-transparent"
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
        <LayoutItem className="bg-danger-200 border-l-primary">
          <strong className="text-sm"> Cerrar sesión </strong>
        </LayoutItem>
      </Button>
    </>
  );
};
