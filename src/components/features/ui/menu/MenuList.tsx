import { menuItems } from "@/data/menu";
import { MenuItem } from "./MenuItem";
import { useAuth } from "@/hooks/useAuth";

export const MenuList = () => {
  const { logout } = useAuth();

  return (
    <>
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
      <MenuItem
        item={{
          id: "0",
          name: "Cerrar sesión",
          path: "/login",
        }}
        func={logout}
      />
    </>
  );
};
