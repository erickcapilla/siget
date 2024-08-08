import { IconProps } from "@/types";
export type MenuItems = {
  id: string;
  name: string;
  path: string;
  icon?: React.FC<IconProps>;
  iconActive?: React.FC<IconProps>;
}

import { HomeOutline, ClipboardOutline, TopicOutline, UsersOutline } from "@/components/icons";
import { HomeSolid, ClipboardSolid, TopicSolid, UsersSolid } from "@/components/icons";

export const menuItems: MenuItems[] = [
  {
    id: "home",
    name: "Inicio",
    path: "/",
    icon: HomeOutline,
    iconActive: HomeSolid,
  },
  {
    id: "admin",
    name: "Administrar",
    path: "/admin",
    icon: ClipboardOutline,
    iconActive: ClipboardSolid,
  },
  {
    id: "topics",
    name: "Temas",
    path: "/topics",
    icon: TopicOutline,
    iconActive: TopicSolid,
  },
  {
    id: "manage",
    name: "Administrar usuarios",
    path: "/manage",
    icon: UsersOutline,
    iconActive: UsersSolid,
  },
  {
    id: "document",
    name: "Documento",
    path: "/document",
    icon: HomeOutline,
    iconActive: HomeSolid,
  },
  {
    id: "advice",
    name: "Asesorías",
    path: "/advice",
    icon: HomeOutline,
    iconActive: HomeSolid,
  },
  {
    id: "profile",
    name: "Perfil",
    path: "/profile",
    icon: HomeOutline,
    iconActive: HomeSolid,
  },
  {
    id: "schedule",
    name: "Agenda",
    path: "/schedule",
    icon: HomeOutline,
    iconActive: HomeSolid,
  },
  {
    id: "degree",
    name: "Titulación",
    path: "/degree",
    icon: HomeOutline,
    iconActive: HomeSolid,
  },
  {
    id: "graduates",
    name: "Titulados",
    path: "/graduates",
    icon: HomeOutline,
    iconActive: HomeSolid,
  },
]